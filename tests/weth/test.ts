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

const [root] = ['A'].map(x => new Signer({ secret: ''.padEnd(64, x) }))
const signers = { root }
const [node, kanta] = await Promise.all([Node.make(), Kanta.make()] as const)
const session = { node, kanta, signers }

const weth = await steps.weth({ session, nonce: 0n })
await node.wait(weth.hash, waitFn)

const foo = await node.call({ to: weth.address, input: selector('symbol()') }, 'latest') // offset . length . data
const bar = foo.slice(2).match(/.{64}/g)!.at(2)!.match(/../g)! // data byte array
const baz = bar.map(x => String.fromCharCode(Number(`0x${x}`))).join('') // to string
console.log(baz)