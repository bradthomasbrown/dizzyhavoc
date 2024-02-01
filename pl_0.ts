import Signer from './lib/Signer.ts'
import * as e from './ejra/mod.ts'
import mkn0 from './lib/mkn0.ts'
import jsSha3 from 'npm:js-sha3@0.9.2'
import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { etc } from 'npm:@noble/secp256k1@2.0.0'
const { keccak256 } = jsSha3
const { bytesToHex } = etc

const foo = JSON.parse(Deno.readTextFileSync('dzhv_balances_avax'))
const dies = `0x7e0b4201${'20'.padStart(64, '0')}${Object.values(foo).length.toString(16).padStart(64, '0')}${Object.entries(foo).map(([a, v]) => `${a.slice(2).padStart(64, '0')}${BigInt(v as string).toString(16).padStart(64, '0')}`).join('')}`
const gasTotals = new Map<string,bigint>()

// config
const interval = 1000

// utility functions, should probably move to /lib
function getCode(path:string) { return Deno.readTextFileSync(`./contracts/${path}`).split('\n').at(-1) }
function signRawTx({
    signer, nonce, gasPrice, gasLimit, to, value, data, chainId
}:{
    signer:Signer, nonce:bigint, gasPrice:bigint, gasLimit:bigint, to?:string, value?:bigint, data?:string, chainId:bigint
}) {
    const rawTxArray = [nonce, gasPrice, gasLimit, to, value, data, chainId, 0, 0]
    const rawTxEncoding = encode(rawTxArray)
    const rawTxHash = keccak256(rawTxEncoding)
    const { r, s, recovery } = signer.sign(rawTxHash)
    if (recovery === undefined) throw new Error('undefined recovery bit')
    const v = chainId * 2n + 35n + BigInt(recovery)
    const signedTxArray = [...rawTxArray.slice(0, 6), v, r, s]
    const signedTxBytes = encode(signedTxArray)
    const signedTx = `0x${bytesToHex(signedTxBytes)}`
    const hash = `0x${keccak256(signedTxBytes)}`
    return { signedTx, hash }
}
function getC2Addr({ salt, create2 }:{ salt:bigint, create2:{ address:string }}) {
    const saltStr = salt.toString(16).padStart(64, '0')
    return `0x${keccak256(hexToBytes(`ff${create2.address.slice(2)}${saltStr}${keccak256(hexToBytes('6020343434335afa3451803b343482933c34f3'))}`)).slice(-40)}`
}

// signer set up
const deployer = new Signer({ secret: Deno.env.get('DZHV_DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('DZHV_IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DZHV_DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('DZHV_WALLET_SECRET') as string })

// acquire node url
// const url = 'https://sepolia-rollup.arbitrum.io/rpc'
const url = 'https://api.avax.network/ext/bc/C/rpc'
// const signer = new Signer({ secret: Deno.env.get('TEST_SIGNER') as string })
// const signers = [signer, deployer, implementer, destroyer, wallet]
// const { url } = await mkn0({ log: true, signers })

// get chainId and gasPrice, add 15% to gasPrice, set up a session shorthand object
let [chainId, gasPrice] = await e.ejrb({ url, ejrrqs: [e.chainId(), e.gasPrice()] })
gasPrice = gasPrice * 115n / 100n
console.log({ chainId, gasPrice })
prompt()
const session = { url, chainId, gasPrice }

// create2
const create2 = await (async () => {
    const signer = deployer
    const code = (getCode('create2/create2_20240118') as string)
        .replace(/\?D\?+/g, deployer.address.slice(2))
    const data = `0x${code}`
    const input = data
    const from = signer.address
    const call = { input, from }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`create2 gasLimit is ${gasLimit}`) != 'y') throw new Error(`create2 gasLimit of ${gasLimit} not approved`)
    // const gasLimit = 75000n
    const nonce = 0n
    const tx = { signer, nonce, gasLimit, data, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = `0x${keccak256(encode([deployer.address, nonce])).slice(-40)}`
    console.log({ address })
    const { ejrrq } = e.sendRawTx({ signedTx })
    return { address, hash, ejrrq }
})()
// e.ejrc({ url, ...create2 })
// while (!await e.receipt({ ...create2 }).call(url)) await new Promise(r => setTimeout(r, interval))
console.log((await e.code({ ...create2 }).call(url)).length)
// const temp = Deno.makeTempFileSync()
// Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...create2 }).call(url), undefined, 4))
// console.log(temp)

// resolver
const resolver = await (async () => {
    const signer = deployer
    const salt = 0n
    const saltStr = salt.toString(16).padStart(64, '0')
    const code = (getCode('Resolver/Resolver.sol') as string)
        .replace(/\?I\?+/g, implementer.address.slice(2))
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?W\?+/g, wallet.address.slice(2))
    const data = `0x${saltStr}${code}`
    const input = data
    const from = signer.address
    const to = create2.address
    const call = { input, from, to }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`resolver gasLimit is ${gasLimit}`) != 'y') throw new Error(`resolver gasLimit of ${gasLimit} not approved`)
    // const gasLimit = 2000000n
    const nonce = 1n
    const tx = { signer, nonce, gasLimit, data, to, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = getC2Addr({ salt, create2 })
    console.log({ address })
    const { ejrrq } = e.sendRawTx({ signedTx })
    return { hash, address, ejrrq }
})()
// e.ejrc({ url, ...resolver })
// while (!await e.receipt({ ...resolver }).call(url)) await new Promise(r => setTimeout(r, interval))
console.log((await e.code({ ...resolver }).call(url)).length)
// const temp = Deno.makeTempFileSync()
// Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...resolver }).call(url), undefined, 4))
// console.log(temp)

// erc20
const erc20 = await (async () => {
    const signer = deployer
    const salt = 1n
    const saltStr = salt.toString(16).padStart(64, '0')
    const code = (getCode('ERC20/ERC20_20240127_1.sol') as string)
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?W\?+/g, wallet.address.slice(2))
    const data = `0x${saltStr}${code}`
    const input = data
    const from = signer.address
    const to = create2.address
    const call = { input, from, to }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`erc20 gasLimit is ${gasLimit}`) != 'y') throw new Error(`erc20 gasLimit of ${gasLimit} not approved`)
    // const gasLimit = 2000000n
    const nonce = 2n
    const tx = { signer, nonce, gasLimit, data, to, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = getC2Addr({ salt, create2 })
    console.log({ address })
    const { ejrrq } = e.sendRawTx({ signedTx })
    return { hash, address, ejrrq }
})()
// e.ejrc({ url, ...erc20 })
// while (!await e.receipt({ ...erc20 }).call(url)) await new Promise(r => setTimeout(r, interval))
console.log((await e.code({ ...erc20 }).call(url)).length)
// const temp = Deno.makeTempFileSync()
// Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...erc20 }).call(url), undefined, 4))
// console.log(temp)

// erc20_link
const erc20_link = await (async () => {
    const signer = implementer
    const nonce = 0n
    const data = '0x3608adf5000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000bb9826a30325d1abd8ef34e6e9615a63f47083e50000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000dd62ed3e00000000000000000000000000000000000000000000000000000000095ea7b30000000000000000000000000000000000000000000000000000000070a0823100000000000000000000000000000000000000000000000000000000313ce567000000000000000000000000000000000000000000000000000000007e0b42010000000000000000000000000000000000000000000000000000000006fdde030000000000000000000000000000000000000000000000000000000095d89b410000000000000000000000000000000000000000000000000000000018160ddd00000000000000000000000000000000000000000000000000000000a9059cbb0000000000000000000000000000000000000000000000000000000023b872dd'
    const input = data
    const from = signer.address
    const to = resolver.address
    const call = { input, from, to }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    gasTotals.set('implementer', (gasTotals.get('implementer') ?? 0n) + gasLimit)
    if (prompt(`erc20_link gasLimit is ${gasLimit}`) != 'y') throw new Error(`erc20_link gasLimit of ${gasLimit} not approved`)
    // const gasLimit = 500000n
    const tx = { signer, nonce, gasLimit, data, to, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const { ejrrq } = e.sendRawTx({ signedTx })
    return { hash, ejrrq }
})()
// e.ejrc({ url, ...erc20_link })
// while (!await e.receipt({ ...erc20_link }).call(url)) await new Promise(r => setTimeout(r, interval))
// const temp = Deno.makeTempFileSync()
// Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...erc20_link }).call(url), undefined, 4))
// console.log(temp)

// dzhv
const dzhv = await (async () => {
    const signer = deployer
    const salt = 2n
    const saltStr = salt.toString(16).padStart(64, '0')
    const code = (getCode('dzhv/dzhv_20240119') as string)
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?R\?+/g, resolver.address.slice(2))
    const data = `0x${saltStr}${code}`
    const input = data
    const from = signer.address
    const to = create2.address
    const call = { input, from, to }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`dzhv gasLimit is ${gasLimit}`) != 'y') throw new Error(`dzhv gasLimit of ${gasLimit} not approved`)
    // const gasLimit = 2000000n
    const nonce = 3n
    const tx = { signer, nonce, gasLimit, data, to, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = getC2Addr({ salt, create2 })
    console.log({ address })
    const { ejrrq } = e.sendRawTx({ signedTx })
    return { hash, address, ejrrq }
})()
e.ejrc({ url, ...dzhv })
while (!await e.receipt({ ...dzhv }).call(url)) await new Promise(r => setTimeout(r, interval))
console.log((await e.code({ ...dzhv }).call(url)).length)
// const temp = Deno.makeTempFileSync()
// Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...dzhv }).call(url), undefined, 4))
// console.log(temp)

const mint = await (async () => {
    const signer = wallet
    const nonce = 0n
    const data = dies
    const input = data
    const from = signer.address
    const to = dzhv.address
    const call = { input, from, to }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    gasTotals.set('wallet', (gasTotals.get('wallet') ?? 0n) + gasLimit)
    if (prompt(`mint gasLimit is ${gasLimit}`) != 'y') throw new Error(`mint gasLimit of ${gasLimit} not approved`)
    // const gasLimit = 1500000n
    const tx = { signer, nonce, gasLimit, data, to, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const { ejrrq } = e.sendRawTx({ signedTx })
    return { hash, ejrrq }
})()
e.ejrc({ url, ...mint })
while (!await e.receipt({ ...mint }).call(url)) await new Promise(r => setTimeout(r, interval))
// const temp = Deno.makeTempFileSync()
// Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...mint }).call(url), undefined, 4))
// console.log(temp)

const costs = new Map<string,number>()
// override the gasPrice here, so that we can run the pipeline on a testnet and get numbers for its mainnet22
// gasPrice = BigInt(parseInt(String(0.1 * 1e9 * 1.15)))
for (const [name, gasTotal] of gasTotals.entries()) costs.set(name, parseFloat(String(gasTotal * gasPrice)) / 1e18)
const gasTotal = [...gasTotals.values()].reduce((p, c) => p + c, 0n)
const cost = [...costs.values()].reduce((p, c) => p + c, 0)
console.log({ gasTotals, costs, gasPrice, gasTotal, cost })