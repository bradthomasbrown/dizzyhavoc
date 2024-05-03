import { Signer } from '../../lib/mod.ts'
import * as e from '../../ejra/mod.ts'
import * as steps from './steps/mod.ts'

const gasTotals = new Map<string,bigint>()

// config
const interval = 1000

// signer set up
const deployer = new Signer({ secret: Deno.env.get('DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('WALLET_SECRET') as string })
const bridge = new Signer({ secret: Deno.env.get('BRIDGE_SECRET') as string })

// acquire node url
const url = 'https://sepolia-rollup.arbitrum.io/rpc'

// get chainId and gasPrice, add 15% to gasPrice, set up a session shorthand object
let [chainId, gasPrice] = await e.ejrb({ url, ejrrqs: [e.chainId(), e.gasPrice()] })
gasPrice = gasPrice * 115n / 100n
console.log({ chainId, gasPrice })
prompt()
const session = { url, chainId, gasPrice, interval, gasTotals, deployer, implementer, destroyer, wallet, bridge }

// create2
const create2 = await steps.create2({ session, nonce: 0n, execute: false }) // get create2 addr
const resolver = await steps.resolver({ session, create2, salt: 0n, nonce: 1n, execute: false }) // get resolver addr
const upgrade = await steps.bridgeableUpgrade({ session, create2, salt: 6n, nonce: 8n, execute: true }) // deployer bridge upgrade
await steps.updateLinks({ session, resolver, upgrade, nonce: 5n, execute: true }) // implementer bridge upgrade

const costs = new Map<string,number>()
// override the gasPrice here, so that we can run the pipeline on a testnet and get numbers for mainnet
gasPrice = BigInt(parseInt(String(3 * 1e9 * 1.15)))
for (const [name, gasTotal] of gasTotals.entries()) costs.set(name, parseFloat(String(gasTotal * gasPrice)) / 1e18)
const gasTotal = [...gasTotals.values()].reduce((p, c) => p + c, 0n)
const cost = [...costs.values()].reduce((p, c) => p + c, 0)
console.log({ gasTotals, costs, gasPrice, gasTotal, cost })