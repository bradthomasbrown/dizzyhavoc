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

const [root, deployer, implementer, destroyer, wallet, bridge] = ['A', '1', '2', '3', '4', '5'].map(x => new Signer({ secret: ''.padEnd(64, x) }))
const signers = { root, deployer, implementer, destroyer, wallet, bridge }
const [node] = await Promise.all([Node.make()] as const)
const session = { node, signers }

const initFundOpts = { chainId: await node.chainId(), gasPrice: await node.gasPrice(), gasLimit: 21000n, value: 10n ** 18n }
await Promise.all([deployer, implementer, destroyer, wallet, bridge].map(async (signer, i) =>
    node.wait(await node.sendRawTx(root.signTx({ ...initFundOpts, nonce: BigInt(i), to: signer.address })), waitFn)))

// deploy weth from root
const weth = await steps.WETH9({ session, nonce: 5n })
await node.wait(weth.hash, waitFn)
Deno.test('weth bytecode deployed', async () => {
    const code = await node.code(weth.address, 'latest')
    assert(code.length > 2)
})

// deploy uniswapV2Factory from root
const { uniswapV2Factory, uniswapV2PairInitCodeHash } = await steps.UniswapV2Factory({ session, nonce: 6n })
await node.wait(uniswapV2Factory.hash, waitFn)
Deno.test('uniswapV2Factory bytecode deployed', async () => {
    const code = await node.code(uniswapV2Factory.address, 'latest')
    assert(code.length > 2)
})
Deno.test('uniswapV2PairInitCodeHash acquired', () => {
    console.log({ uniswapV2PairInitCodeHash })
    assert(uniswapV2PairInitCodeHash.length == 64)
})

// deploy uniswapV3Factory from root
const { uniswapV3Factory, uniswapV3PoolInitCodeHash } = await steps.UniswapV3Factory({ session, nonce: 7n })
await node.wait(uniswapV3Factory.hash, waitFn)
Deno.test('uniswapV3Factory bytecode deployed', async () => {
    const code = await node.code(uniswapV3Factory.address, 'latest')
    assert(code.length > 2)
})
Deno.test('uniswapV3PoolInitCodeHash acquired', () => {
    console.log({ uniswapV3PoolInitCodeHash })
    assert(uniswapV3PoolInitCodeHash.length == 64)
})

// deploy universalRouter from root
const universalRouter = await steps.UniversalRouter({
    session, nonce: 8n,
    weth, uniswapV2Factory, uniswapV3Factory,
    uniswapV2PairInitCodeHash, uniswapV3PoolInitCodeHash
})
await node.wait(universalRouter.hash, waitFn)
Deno.test('universalRouter bytecode deployed', async () => {
    const code = await node.code(universalRouter.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV create2 from deployer
const dzhvCreate2 = await steps.DZHVCreate2({ session, nonce: 0n })
await node.wait(dzhvCreate2.hash, waitFn)
Deno.test('dzhv create2 bytecode deployed', async () => {
    const code = await node.code(dzhvCreate2.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV resolver from deployer using create2
const dzhvResolver = await steps.DZHVResolver({ session, dzhvCreate2, nonce: 1n, salt: 0n })
await node.wait(dzhvResolver.hash, waitFn)
Deno.test('dzhv resolver bytecode deployed', async () => {
    const code = await node.code(dzhvResolver.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV erc20 from deployer using create2
const dzhvErc20 = await steps.DZHVERC20({ session, dzhvCreate2, nonce: 2n, salt: 1n })
await node.wait(dzhvErc20.hash, waitFn)
Deno.test('dzhv erc20 bytecode deployed', async () => {
    const code = await node.code(dzhvErc20.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV from deployer using create2
const dzhv = await steps.DZHV({ session, dzhvCreate2, dzhvResolver, nonce: 3n, salt: 2n })
await node.wait(dzhv.hash, waitFn)
Deno.test('dzhv bytecode deployed', async () => {
    const code = await node.code(dzhv.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// link ERC20 functions to resolver from implementer
const dzhvLink = await steps.DZHVLink({ session, dzhvResolver, dzhvErc20, nonce: 0n })
await node.wait(dzhvLink.hash, waitFn)
Deno.test('dzhv linked to erc20 via resolver', async () => {
    const receipt = await node.receipt(dzhvLink.hash)
    assert(receipt)
    const totalSupply = await node.call({ to: dzhv.address, input: selector('totalSupply()') }, receipt.blockNumber)
    console.log(totalSupply)
    assert(totalSupply != '0x')
})

// mint DZHV from wallet
const dzhvMint = await steps.DZHVMint({ session, dzhv, nonce: 0n })
await node.wait(dzhvMint.hash, waitFn)
Deno.test('dzhv mint', async () => {
    const totalSupply = await node.call({ to: dzhv.address, input: selector('totalSupply()') }, 'latest')
    console.log(totalSupply)
    assert(totalSupply != '0x')
    assert(BigInt(totalSupply) > 0n)
})