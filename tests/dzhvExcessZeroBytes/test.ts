import { Signer, signRawTx } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.1/lib/mod.ts'
import { Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.2/lib/node/Node.ts'
import * as steps from './steps/mod.ts'

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

const deployer = new Signer({ secret: ''.padEnd(64, 'B') })
const destroyer = new Signer({ secret: ''.padEnd(64, 'C') })
const signers = { deployer, destroyer }
const node = await Node.make()

const chainId = await node.chainId()
const gasPrice = await node.gasPrice()
await fund(node, deployer, 10n ** 18n)
const session = { url: node.rpc, chainId, gasPrice, signers }

const create2 = await steps.create2({ session, nonce: 0n })
await wait(node, create2.hash)

const dzhv = await steps.dzhv({ session, create2, nonce: 1n, salt: 0n })
await wait(node, dzhv.hash)

const dzhvFix = await steps.dzhvFix({ session, create2, nonce: 2n, salt: 1n })
await wait(node, dzhvFix.hash)

console.log(await node.code(dzhv.address, 'latest'))
console.log(await node.code(dzhvFix.address, 'latest'))