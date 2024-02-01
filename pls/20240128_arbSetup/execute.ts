import { Signer } from '../../lib/mod.ts'
import * as e from '../../ejra/mod.ts'
import mkn0 from '../../lib/mkn0.ts'
import * as steps from './steps/mod.ts'

const foo = JSON.parse(Deno.readTextFileSync('dzhv_balances_arb'))
const dies = `0x7e0b4201${'20'.padStart(64, '0')}${Object.values(foo).length.toString(16).padStart(64, '0')}${Object.entries(foo).map(([a, v]) => `${a.slice(2).padStart(64, '0')}${BigInt(v as string).toString(16).padStart(64, '0')}`).join('')}`
const gasTotals = new Map<string,bigint>()

// config
const interval = 1000

// signer set up
const deployer = new Signer({ secret: Deno.env.get('DZHV_DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('DZHV_IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DZHV_DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('DZHV_WALLET_SECRET') as string })

// acquire node url
// const signer = new Signer({ secret: Deno.env.get('TEST_SIGNER') as string })
// const signers = [signer, deployer, implementer, destroyer, wallet]
// const { url } = await mkn0({ signers })
const url = 'https://arb1.arbitrum.io/rpc'

// get chainId and gasPrice, add 15% to gasPrice, set up a session shorthand object
let [chainId, gasPrice] = await e.ejrb({ url, ejrrqs: [e.chainId(), e.gasPrice()] })
gasPrice = gasPrice * 115n / 100n
console.log({ chainId, gasPrice })
prompt()
const session = { url, chainId, gasPrice, interval, gasTotals, deployer, implementer, destroyer, wallet }

// create2
const create2 = await steps.create2({ session }) // deploy create2
const resolver = await steps.resolver({ session, create2, salt: 0n, nonce: 1n }) // deploy resolver
const erc20 = await steps.erc20({ session, create2, salt: 1n, nonce: 2n }) // deploy erc20
await steps.erc20_link({ session, resolver, erc20, nonce: 0n }) // link erc20
const dzhv = await steps.dzhv({ session, create2, salt: 2n, resolver, nonce: 3n }) // deploy dzhv
const mint =  await steps.mint({ session, dzhv, dies, nonce: 1n, execute: true }) // mint

// console.log(await e.receipt({ ...mint }).call(url))

const costs = new Map<string,number>()
// override the gasPrice here, so that we can run the pipeline on a testnet and get numbers for its mainnet22
// gasPrice = BigInt(parseInt(String(25 * 1e9 * 1.15)))
for (const [name, gasTotal] of gasTotals.entries()) costs.set(name, parseFloat(String(gasTotal * gasPrice)) / 1e18)
const gasTotal = [...gasTotals.values()].reduce((p, c) => p + c, 0n)
const cost = [...costs.values()].reduce((p, c) => p + c, 0)
console.log({ gasTotals, costs, gasPrice, gasTotal, cost })