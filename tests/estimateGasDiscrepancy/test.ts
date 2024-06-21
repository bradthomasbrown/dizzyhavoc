import { Node, Kanta, Signer, signRawTx } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.4/lib/mod.ts'
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

const deployer = new Signer({ secret: ''.padEnd(64, '1') })
const implementer = new Signer({ secret: ''.padEnd(64, '2') })
const destroyer = new Signer({ secret: ''.padEnd(64, '3') })
const wallet = new Signer({ secret: ''.padEnd(64, '4') })
const signers = { deployer, implementer, destroyer, wallet }
const node = await Node.make()
const kanta = await Kanta.make()

const chainId = await node.chainId()
const gasPrice = await node.gasPrice()
await fund(node, deployer, 10n ** 18n)
const session = { url: node.rpc, chainId, gasPrice, signers }

const create2 = await steps.create2({ session, nonce: 0n })
await wait(node, create2.hash)

const f0 = Deno.makeTempFileSync()
const t0 = await steps.resolver_traceCall({ session, create2, nonce: 1n, salt: 0n, kanta })
Deno.writeTextFileSync(f0, JSON.stringify(t0, undefined, 4))
console.log(f0)

const resolver = await steps.resolver({ session, create2, nonce: 1n, salt: 0n, kanta })
await wait(node, resolver.hash)

const f1 = Deno.makeTempFileSync()
Deno.writeTextFileSync(f1, JSON.stringify(await node.traceTx(resolver.hash), undefined, 4))
console.log(f1)

console.log(await node.code(resolver.address, 'latest'))