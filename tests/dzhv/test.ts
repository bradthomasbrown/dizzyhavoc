import { Node, Kanta, Signer, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts'
import * as steps from './steps/mod.ts'

async function waitFn(node:Node, hash:string) {
    const interval = 10
    const timeout = 5000
    const start = Date.now()
    while (true) {
        const receipt = await node.receipt(hash)
        if (receipt) return
        if (Date.now() - start >= timeout) throw new Error('w4_defaultWaitFn timeout')
        await new Promise(r => setTimeout(r, interval))
    }
}

const [root, deployer, implementer, destroyer, wallet, bridge] = ['A', '1', '2', '3', '4', '5'].map(x => new Signer({ secret: ''.padEnd(64, x) }))
const signers = { deployer, implementer, destroyer, wallet, bridge }
const [node, kanta] = await Promise.all([Node.make(), Kanta.make()] as const)
const session = { node, kanta, signers }

const initFundOpts = { chainId: await node.chainId(), gasPrice: await node.gasPrice(), gasLimit: 21000n, value: 10n ** 18n }
await node.wait(await node.sendRawTx(root.signTx({ ...initFundOpts, nonce: 0n, to: deployer.address })), waitFn)
await node.wait(await node.sendRawTx(root.signTx({ ...initFundOpts, nonce: 1n, to: implementer.address })), waitFn)
await node.wait(await node.sendRawTx(root.signTx({ ...initFundOpts, nonce: 2n, to: wallet.address })), waitFn)

const create2 = await steps.create2({ session, nonce: 0n })
await node.wait(create2.hash, waitFn)

const resolver = await steps.resolver({ session, create2, nonce: 1n, salt: 0n })
const erc20 = await steps.erc20({ session, create2, nonce: 2n, salt: 1n })
await node.wait(erc20.hash, waitFn)

const dzhv = await steps.dzhv({ session, create2, resolver, nonce: 3n, salt: 2n })
await node.wait(dzhv.hash, waitFn)

const link = await steps.link({ session, resolver, erc20, nonce: 0n })
await node.wait(link.hash, waitFn)

const mint = await steps.mint({ session, dzhv, nonce: 0n, address: wallet.address, value: 100n * 10n ** 18n })
await node.wait(mint.hash, waitFn)

console.log(BigInt(await node.call({ to: dzhv.address, input: `${selector('balanceOf(address)')}${wallet.address.slice(2).padStart(64, '0')}` }, 'latest')))

// console.log(await node.receipt(mint.hash))
