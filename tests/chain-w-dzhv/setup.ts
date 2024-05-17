import { Signer } from '../../lib/mod.ts'
import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.0/lib/mod.ts'
import * as steps from './steps/mod.ts'

// signer set up
const deployer = new Signer({ secret: Deno.env.get('DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('WALLET_SECRET') as string })
const signers = { deployer, implementer, destroyer, wallet }

// acquire node url
const url = 'http://node'

// get chainId and gasPrice, add 15% to gasPrice, set up a session shorthand object
const chainId = await ejra.methods.chainId(url)
let gasPrice = await ejra.methods.gasPrice(url)

const session = { url, chainId, gasPrice, signers }

// create2
const create2 = await steps.create2({ session, nonce: 0n, execute: true }) // deploy create2
// const resolver = await steps.resolver({ session, create2, salt: 0n, nonce: 1n, execute: true }) // deploy resolver
// const erc20 = await steps.erc20({ session, create2, salt: 1n, nonce: 2n, execute: true }) // deploy erc20
// await steps.erc20_link({ session, resolver, erc20, nonce: 0n, execute: true }) // link erc20
// const dzhv = await steps.dzhv({ session, create2, salt: 2n, resolver, nonce: 3n, execute: true }) // deploy dzhv
// await steps.mint({ session, dzhv, dies, nonce: 0n, execute: true }) // initial mint

const costs = new Map<string,number>()
// override the gasPrice here, so that we can run the pipeline on a testnet and get numbers for its mainnet22
gasPrice = BigInt(parseInt(String(3 * 1e9 * 1.15)))
for (const [name, gasTotal] of gasTotals.entries()) costs.set(name, parseFloat(String(gasTotal * gasPrice)) / 1e18)
const gasTotal = [...gasTotals.values()].reduce((p, c) => p + c, 0n)
const cost = [...costs.values()].reduce((p, c) => p + c, 0)
console.log({ gasTotals, costs, gasPrice, gasTotal, cost })