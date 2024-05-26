import { Signer, signRawTx } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.1/lib/mod.ts'
import * as steps from './steps/mod.ts'
import { Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.7/lib/Node.ts';

async function wait(node:Node, hash:string) {
    while (!await node.receipt(hash)) await new Promise(r => setTimeout(r, 250))
}

let rootNonce = 0n
async function fund(node:Node, signer:Signer, value:bigint) {
    const root = new Signer({ secret: ''.padEnd(64, 'A') })
    const signedTx = signRawTx({ signer: root, nonce: rootNonce++, gasPrice, gasLimit: 21000n, chainId, value, to: signer.address, eip: 'eip-155' })!
    const hash = await node.sendRawTx(signedTx)
    await wait(node, hash)
}

// signer set up
const bridge = new Signer({ secret: Deno.env.get('BRIDGE_SECRET') as string })
const deployer = new Signer({ secret: Deno.env.get('DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('WALLET_SECRET') as string })
const signers = { deployer, implementer, destroyer, wallet, bridge }

// acquire node url and node
const url = 'http://node'
const node = new Node(url)

// setup
const chainId = await node.chainId()
const gasPrice = await node.gasPrice()
await fund(node, deployer, 10n ** 18n)
await fund(node, implementer, 10n ** 18n)
await fund(node, wallet, 10n ** 18n)
const session = { url, chainId, gasPrice, signers }

// deployments
const create2 = await steps.create2({ session, nonce: 0n }) // deploy create2
await wait(node, create2.hash)
const resolver = await steps.resolver({ session, nonce: 1n, salt: 0n, create2 }) // deploy resolver
await wait(node, resolver.hash)
const erc20 = await steps.erc20({ session, nonce: 2n, salt: 1n, create2 }) // deploy erc20
await wait(node, erc20.hash)
const dzhv = await steps.dzhv({ session, nonce: 3n, salt: 2n, create2, resolver }) // deploy dzhv

const link = await steps.link({ session, resolver, erc20, nonce: 0n }) // implement erc20
await wait(node, link.hash)

const mint = await steps.mint({ session, dzhv, nonce: 0n, address: wallet.address, value: 10n ** (9n + 18n) }) // wallet mint
await wait(node, mint.hash)
