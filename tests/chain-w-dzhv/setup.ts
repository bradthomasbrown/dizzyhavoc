import { Signer, signRawTx } from '../../lib/mod.ts'
import * as steps from './steps/mod.ts'
import { Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.7/lib/Node.ts';

async function wait(node:Node, hash:string) {
    while (!await node.receipt(hash)) await new Promise(r => setTimeout(r, 250))
}

let rootNonce = 0n
async function fund(node:Node, signer:Signer, value:bigint) {
    const root = new Signer({ secret: ''.padEnd(64, 'A') })
    const { signedTx, hash } = signRawTx({ signer: root, nonce: rootNonce++, gasPrice, gasLimit: 21000n, chainId, value, to: signer.address })
    await node.sendRawTx(signedTx)
    await wait(node, hash)
}

// signer set up
const deployer = new Signer({ secret: Deno.env.get('DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('WALLET_SECRET') as string })
const signers = { deployer, implementer, destroyer, wallet }

// acquire node url and node
const url = 'http://node'
const node = new Node(url)

// setup
const chainId = await node.chainId()
const gasPrice = await node.gasPrice()
await fund(node, deployer, 10n ** 18n)
const session = { url, chainId, gasPrice, signers }

// // create2
const create2 = await steps.create2({ session, nonce: 0n, execute: true }) // deploy create2
await wait(node, create2.hash)
// const resolver = await steps.resolver({ session, create2, salt: 0n, nonce: 1n, execute: true }) // deploy resolver
// const erc20 = await steps.erc20({ session, create2, salt: 1n, nonce: 2n, execute: true }) // deploy erc20
// await steps.erc20_link({ session, resolver, erc20, nonce: 0n, execute: true }) // link erc20
// const dzhv = await steps.dzhv({ session, create2, salt: 2n, resolver, nonce: 3n, execute: true }) // deploy dzhv
// await steps.mint({ session, dzhv, dies, nonce: 0n, execute: true }) // initial mint

