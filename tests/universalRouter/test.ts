import { assert } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { Node, Signer, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts'
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
const [node] = await Promise.all([Node.make()] as const)
const session = { node, signers }

const weth = await steps.WETH9({ session, nonce: 0n })
await node.wait(weth.hash, waitFn)

Deno.test('weth bytecode deployed', async () => {
    const code = await node.code(weth.address, 'latest')
    assert(code.length > 2)
})

const { uniswapV2Factory, uniswapV2PairInitCodeHash } = await steps.UniswapV2Factory({ session, nonce: 1n })
await node.wait(uniswapV2Factory.hash, waitFn)

Deno.test('uniswapV2Factory bytecode deployed', async () => {
    const code = await node.code(uniswapV2Factory.address, 'latest')
    assert(code.length > 2)
})

Deno.test('uniswapV2PairInitCodeHash acquired', () => {
    console.log({ uniswapV2PairInitCodeHash })
    assert(uniswapV2PairInitCodeHash.length == 64)
})

const { uniswapV3Factory, uniswapV3PoolInitCodeHash } = await steps.UniswapV3Factory({ session, nonce: 2n })
await node.wait(uniswapV3Factory.hash, waitFn)

Deno.test('uniswapV3Factory bytecode deployed', async () => {
    const code = await node.code(uniswapV3Factory.address, 'latest')
    assert(code.length > 2)
})

Deno.test('uniswapV3PoolInitCodeHash acquired', () => {
    console.log({ uniswapV3PoolInitCodeHash })
    assert(uniswapV3PoolInitCodeHash.length == 64)
})