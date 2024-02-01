import Signer from '../../lib/Signer.ts'
import deploy from '../../lib/deploy.ts'
import * as e from '../../ejra/mod.ts'
import verify from '../../lib/verify.ts'
import mkn0 from '../../lib/mkn0.ts'
import z from 'https://deno.land/x/zod@v3.22.4/index.ts'
import jsSha3 from 'npm:js-sha3@0.9.2'
import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
const { keccak256 } = jsSha3

const secret = Deno.args[0]
const signer = new Signer({ secret })
// const url = 'https://avalanche.blockpi.network/v1/rpc/public'
const { url } = await mkn0({ log: true, signer })

const [chainId, gasPrice] = await (() => {
    const ejrrqs = [e.chainId(), e.gasPrice()]
    return e.ejrb({ url, ejrrqs })
})()
const map:Record<string,{
    ejrrq:{ method: string; params: readonly [string]; schema: z.ZodString; }
    hash:string
    address:string
}> = {}

// await (async () => {
//     const name = 'setServers'
//     const bytecode = '...'
//     const nonce = 0n
//     const accessList = [] as const
//     const gasLimit = await (() => {
//         const input = bytecode
//         const call = { input }
//         const ejrrq = e.estimateGas({ call })
//         return e.ejrc({ url, ejrrq })
//     })()
//     const data = bytecode
//     const stx = signer.signTx({ chainId, nonce, gasPrice, gasLimit, data, accessList })
//     const stxBytes = hexToBytes(stx.slice(2))
//     const encoding = encode([signer.address, nonce])
//     map[name] = {
//         ejrrq: e.sendRawTx({ data: stx }),
//         hash: `0x${keccak256(stxBytes)}`,
//         address: `0x${keccak256(encoding).slice(-40)}`
//     }
// })()

// await (async () => {
//     const name = 'dizzyHavoc'
//     const bytecode = '...'
//     const nonce = 0n
//     const accessList = [] as const
//     const gasLimit = await (async () => {
//         const input = bytecode
//         const call = { input }
//         const ejrrq = e.estimateGas({ call })
//         return await e.ejrc({ url, ejrrq })
//     })()
//     const data = bytecode
//     const stx = signer.signTx({ chainId, nonce, gasPrice, gasLimit, data, accessList })
//     const stxBytes = hexToBytes(stx.slice(2))
//     const encoding = encode([signer.address, nonce])
//     map[name] = {
//         ejrrq: e.sendRawTx({ data: stx }),
//         hash: `0x${keccak256(stxBytes)}`,
//         address: `0x${keccak256(encoding).slice(-40)}`
//     }
// })()

// await (async () => {
//     const name = 'erc20'
//     const bytecode = '...'
//     const nonce = 0n
//     const accessList = [] as const
//     const gasLimit = await (async () => {
//         const input = bytecode
//         const call = { input }
//         const ejrrq = e.estimateGas({ call })
//         await e.ejrc({ url, ejrrq })
//     })()
//     const data = bytecode
//     const stx = signer.signTx({ chainId, nonce, gasPrice, gasLimit, data, accessList })
//     const stxBytes = hexToBytes(stx.slice(2))
//     const encoding = encode([signer.address, nonce])
//     map[name] = {
//         ejrrq: e.sendRawTx({ data: stx }),
//         hash: `0x${keccak256(stxBytes)}`,
//         address: `0x${keccak256(encoding).slice(-40)}`
//     }
// })()

// const ejrrqs = Object.values(map).map(({ ejrrq }) => ejrrq)

// await e.ejrb({ url, ejrrqs })

// console.log({
//     setServersAddress, setServersDeployTxHash,
//     dizzyHavocAddress, dizzyHavocDeployTxHash,
//     erc20Address, erc20DeployTxHash
// })

// await new Promise(r => setTimeout(r, 250))

// const setServersData = '0xea81ee95000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c9c423f875677351ab79c058ed1c38f2b36061a40000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000dd62ed3e00000000000000000000000000000000000000000000000000000000095ea7b30000000000000000000000000000000000000000000000000000000070a0823100000000000000000000000000000000000000000000000000000000313ce56700000000000000000000000000000000000000000000000000000000f84058400000000000000000000000000000000000000000000000000000000006fdde030000000000000000000000000000000000000000000000000000000095d89b410000000000000000000000000000000000000000000000000000000018160ddd00000000000000000000000000000000000000000000000000000000a9059cbb0000000000000000000000000000000000000000000000000000000023b872dd'
//     .replace('c9c423f875677351ab79c058ed1c38f2b36061a4', erc20Address.slice(2))
// const setServersCall = { from: signer.address, to: setServersAddress, input: setServersData, nonce: 3n }
// // const tracePath = Deno.makeTempFileSync()
// // const trace = await e.ejrc({ url, ejrrq: e.traceCall({ call: setServersCall }) })
// // Deno.writeTextFileSync(tracePath, JSON.stringify(trace, undefined, 4))
// // console.log(tracePath)
// const setServersGasLimit = await e.ejrc({ url, ejrrq: e.estimateGas({ call: setServersCall }) })
// const setServersStx = signer.signTx({ ...setServersCall, data: setServersData, gasLimit: setServersGasLimit, chainId, gasPrice })
// const setServersTxHash = await e.ejrc({ url, ejrrq: e.sendRawTx({ data: setServersStx }) })

// await new Promise(r => setTimeout(r, 250))

// ejrrq = e.traceTx({ txHash: setServersTxHash })
// await e.ejrc({ url, ejrrq })
// const tracePath = Deno.makeTempFileSync()
// const trace = await e.ejrc({ url, ejrrq: e.traceTx({ txHash: setServersTxHash }) })
// Deno.writeTextFileSync(tracePath, JSON.stringify(trace, undefined, 4))
// console.log(tracePath)

// const verifyUrl = 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan'
// const apikey = 'snowtrace'
// const compilerversion = 'v0.8.23+commit.f704f362'
// const evmversion = 'paris'
// console.log(await verify({
//     sourceCode: Deno.readTextFileSync('./contracts/SetServers/SetServers.sol')
//         .replace('0xC9c423f875677351ab79C058eD1C38F2b36061a4', signer.address),
//     contractname: 'SetServers',
//     contractaddress: setServersAddress,
//     url: verifyUrl, apikey, compilerversion, evmversion
// }))
// console.log(await verify({
//     sourceCode: Deno.readTextFileSync('./contracts/ERC20/ERC20.sol')
//         .replace('0xC9c423f875677351ab79C058eD1C38F2b36061a4', signer.address),
//     contractname: 'ERC20',
//     contractaddress: erc20Address,
//     url: verifyUrl, apikey, compilerversion, evmversion
// }))