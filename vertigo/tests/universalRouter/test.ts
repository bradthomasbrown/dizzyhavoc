import { assert } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { Node, Signer, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.10/lib/mod.ts'
import { ExitHandlers } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/exit-handlers@0.0.1/ExitHandlers.ts'
import {
    NFTDescriptor, NonfungiblePositionManager, NonfungibleTokenPositionDescriptor,
    UniswapV2Factory, UniswapV3Factory, UniversalRouter,
    WETH9
} from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/uniswap@0.0.4/mod.ts'
import * as steps from './steps/mod.ts'

const exitHandlers = new ExitHandlers()

const [root, deployer, implementer, destroyer, wallet, bridge] = ['A', '1', '2', '3', '4', '5'].map(x => new Signer({ secret: ''.padEnd(64, x) }))
const signers = { root, deployer, implementer, destroyer, wallet, bridge }
const [node] = await Promise.all([Node.make(exitHandlers)] as const)
const session = { node, signers }

const initFundOpts = { chainId: await node.chainId(), gasPrice: await node.gasPrice(), gasLimit: 21000n, value: 2n * 10n ** 18n }
await Promise.all([deployer, implementer, destroyer, wallet, bridge].map(async (signer, i) =>
    node.wait(await node.sendRawTx(root.signTx({ ...initFundOpts, nonce: BigInt(i), to: signer.address })))
))

// deploy weth from root
const weth9 = await node.deploy(root, WETH9.bytecode)
Deno.test('weth bytecode deployed', async () => {
    const code = await node.code(weth9.address, 'latest')
    assert(code.length > 2)
})

// deploy uniswapV2Factory from root
const uniswapV2Factory = await node.deploy(root, UniswapV2Factory.bytecode, ''.padEnd(64, '0'))
Deno.test('uniswapV2Factory bytecode deployed', async () => {
    const code = await node.code(uniswapV2Factory.address, 'latest')
    assert(code.length > 2)
})

// deploy uniswapV3Factory from root
const uniswapV3Factory = await node.deploy(root, UniswapV3Factory.bytecode)
Deno.test('uniswapV3Factory bytecode deployed', async () => {
    const code = await node.code(uniswapV3Factory.address, 'latest')
    assert(code.length > 2)
})

// deploy universalRouter from root
const universalRouter = await node.deploy(
    root,
    UniversalRouter.bytecode,
    `${''.padEnd(64, '0')}${                                // 0 address
    weth9.address.slice(2).padStart(64, '0')}${             // weth address
    ''.padEnd(64 * 14, '0')}${                              // 14 consecutive 0 addresses
    uniswapV2Factory.address.slice(2).padStart(64, '0')}${  // v2factory address
    uniswapV3Factory.address.slice(2).padStart(64, '0')}${  // v3factory address
    UniswapV2Factory.pairInitCodeHash}${                    // v2pair init hash
    UniswapV3Factory.poolInitCodeHash}`                     // v3pool init hash
)
Deno.test('universalRouter bytecode deployed', async () => {
    const code = await node.code(universalRouter.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy nftDescriptor from froot
const nftDescriptor = await node.deploy(
    root,
    NFTDescriptor.bytecode
)
Deno.test('nftDescriptor bytecode deployed', async () => {
    const code = await node.code(nftDescriptor.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy nonfungibleTokenPositionDescriptor from root
const nonfungibleTokenPositionDescriptor = await node.deploy(
    root,
    NonfungibleTokenPositionDescriptor.bytecode(nftDescriptor.address).replace(/e34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54/, UniswapV3Factory.poolInitCodeHash),
    weth9.address.slice(2).padStart(64, '0')
)
Deno.test('nonfungibleTokenPositionDescriptor bytecode deployed', async () => {
    const code = await node.code(nonfungibleTokenPositionDescriptor.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy nonfungiblePositionManager from root
const nonfungiblePositionManager = await node.deploy(
    root,
    NonfungiblePositionManager.bytecode.replace(/e34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54/, UniswapV3Factory.poolInitCodeHash),
    `${uniswapV3Factory.address.slice(2).padStart(64, '0')}${
    weth9.address.slice(2).padStart(64, '0')}${
    nonfungibleTokenPositionDescriptor.address.slice(2).padStart(64, '0')}`
)
Deno.test('nonfungiblePositionManager bytecode deployed', async () => {
    const code = await node.code(nonfungiblePositionManager.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV create2 from deployer
const dzhvCreate2 = await steps.DZHVCreate2({ session, nonce: 0n })
await node.wait(dzhvCreate2.hash)
Deno.test('dzhv create2 bytecode deployed', async () => {
    const code = await node.code(dzhvCreate2.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV resolver from deployer using create2
const dzhvResolver = await steps.DZHVResolver({ session, dzhvCreate2, nonce: 1n, salt: 0n })
await node.wait(dzhvResolver.hash)
Deno.test('dzhv resolver bytecode deployed', async () => {
    const code = await node.code(dzhvResolver.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV erc20 from deployer using create2
const dzhvErc20 = await steps.DZHVERC20({ session, dzhvCreate2, nonce: 2n, salt: 1n })
await node.wait(dzhvErc20.hash)
Deno.test('dzhv erc20 bytecode deployed', async () => {
    const code = await node.code(dzhvErc20.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// deploy DZHV from deployer using create2
const dzhv = await steps.DZHV({ session, dzhvCreate2, dzhvResolver, nonce: 3n, salt: 2n })
await node.wait(dzhv.hash)
Deno.test('dzhv bytecode deployed', async () => {
    const code = await node.code(dzhv.address, 'latest')
    console.log({ code }, code.length)
    assert(code.length > 2)
})

// link ERC20 functions to resolver from implementer
const dzhvLink = await steps.DZHVLink({ session, dzhvResolver, dzhvErc20, nonce: 0n })
await node.wait(dzhvLink.hash)
Deno.test('dzhv linked to erc20 via resolver', async () => {
    const receipt = await node.receipt(dzhvLink.hash)
    assert(receipt)
    const totalSupply = await node.call({ to: dzhv.address, input: selector('totalSupply()') }, receipt.blockNumber)
    console.log(totalSupply)
    assert(totalSupply != '0x')
})

// mint DZHV from wallet
const dzhvMint = await steps.DZHVMint({ session, dzhv, nonce: 0n })
await node.wait(dzhvMint.hash)
Deno.test('dzhv mint', async () => {
    const totalSupply = await node.call({ to: dzhv.address, input: selector('totalSupply()') }, 'latest')
    console.log(totalSupply)
    assert(totalSupply != '0x')
    assert(BigInt(totalSupply) > 0n)
})

// approve nonFungiblePositionManager to move wallet's tokens
const dzhvApproveNonfungiblePositionManager = await steps.DZHVApproveNonfungiblePositionManager({ session, dzhv, nonfungiblePositionManager, nonce: 1n })
await node.wait(dzhvApproveNonfungiblePositionManager.hash)
Deno.test('dzhv approve NonfungiblePositionManager', async () => {
    const allowance = await node.call(
        {
            to: dzhv.address,
            input:
                `${selector('allowance(address,address)')
                }${wallet.address.slice(2).padStart(64, '0')
                }${nonfungiblePositionManager.address.slice(2).padStart(64, '0')}`
        },
        'latest'
    )
    console.log({ allowance })
    assert(allowance != '0x')
    assert(BigInt(allowance) > 0n)
})

// mint a liquidity position
const foo = function(
    tokenA:string, tokenB:string,
    fee:number,
    amountADesired:bigint, amountBDesired:bigint,
    lowerPrice:number, upperPrice:number
):{
    sqrtPriceX96:bigint,
    token0:string, token1:string,
    amount0Desired:bigint, amount1Desired:bigint,
    tickLower:number, tickUpper:number
} {

    const [token0, token1] = [tokenA, tokenB].sort()

    const [amount0Desired, amount1Desired] = token0 == tokenA
        ? [amountADesired, amountBDesired]
        : [amountBDesired, amountADesired]

    const price = Number(amount1Desired) / Number(amount0Desired)
    const sqrtPriceX96 = BigInt(Math.floor(Math.sqrt(price) * 2 ** 96))

    const correctedLowerPrice = token0 == tokenA ? lowerPrice : upperPrice ** -1
    const correctedUpperPrice = token0 == tokenA ? upperPrice : lowerPrice ** -1
    const tickSpacing = (() => { switch (fee) {
        case 100: return 1
        case 500: return 10
        case 3000: return 60
        case 10000: return 200
        default: throw new Error(`fee ${fee} not valid`)
    } })()
    const realTickLower = Math.log(correctedLowerPrice) / Math.log(1.0001)
    const realTickUpper = Math.log(correctedUpperPrice) / Math.log(1.0001)
    const tickLower = Math.floor(realTickLower / tickSpacing) * tickSpacing
    const tickUpper = Math.ceil(realTickUpper / tickSpacing) * tickSpacing

    return {
        sqrtPriceX96,
        token0, token1,
        amount0Desired, amount1Desired,
        tickLower, tickUpper
    }

}

const {
    sqrtPriceX96,
    token0, token1,
    amount0Desired, amount1Desired,
    tickLower, tickUpper
} = foo(weth9.address, dzhv.address, 10000, 10n ** 18n, 10n ** 8n * 10n ** 18n, 1e7, 1e9)

console.log({ weth9, dzhv })
console.log({ sqrtPriceX96, token0, token1, amount0Desired, amount1Desired, tickLower, tickUpper })

const input =
    `${selector('multicall(bytes[])')   // multicall function
    }${'20'.padStart(64, '0')           // offset of bytes array data 0x0
    }${'3'.padStart(64, '0')            // length of bytes array (how many sets of bytes there are) 0x20
    }${'60'.padStart(64, '0')           // offset of first set of bytes 0x40 + 0x60 = 0xa0
    }${'120'.padStart(64, '0')          // offset of second set of bytes 0x60 0x40 + 0x120 = 0x160
    }${'2c0'.padStart(64, '0')          // offset of third set of bytes 0x80 0x40 + 0x2c0 = 0x300
    }${'84'.padStart(64, '0')           // length of first set of bytes 0xa0 (selector + 2 addresses)
                                        // first set of bytes selector 0xc0
    }${selector('createAndInitializePoolIfNecessary(address,address,uint24,uint160)').slice(2)
                                        // dzhv address 0xc4
    }${dzhv.address.slice(2).padStart(64, '0') 
                                        // weth address 0xe4
    }${weth9.address.slice(2).padStart(64, '0') 
    }${'2710'.padStart(64, '0')         // hex 0x2710 = 10000, the fee in hundredth's of a bip (bip being 1/100th of 1%, or 0.0001). so, fee of 1% 0x104
                                        // The initial square root price of the pool as a Q64.96 value (what) 0x124
    }${sqrtPriceX96.toString(16).padStart(64, '0') 
    }${''.padEnd((32 - 4) * 2, '0')     // filler so the next part starts on a new word 0x144
    }${'164'.padStart(64, '0')          // the length of the second set of bytes (selector + MintParams (11 word struct)) 0x160
                                        // second set of bytes selector 0x180
    }${selector('mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))').slice(2)
                                        // token0 0x184
    }${token0.slice(2).padStart(64, '0')
                                        // token1 0x1a4
    }${token1.slice(2).padStart(64, '0')
    }${'2710'.padStart(64, '0')         // fee 0x1c4
                                        // tickLower 0x1e4
    }${(tickLower >= 0 ? tickLower : (BigInt(-tickLower) ^ (2n ** 256n - 1n)) + 1n).toString(16).padStart(64, '0')
                                        // tickUpper  0x204
    }${(tickUpper >= 0 ? tickUpper : (BigInt(-tickUpper) ^ (2n ** 256n - 1n)) + 1n).toString(16).padStart(64, '0')
                                        // amount0Desired 0x224
    }${amount0Desired.toString(16).padStart(64, '0')
                                        // amount1Desired 0x244
    }${amount1Desired.toString(16).padStart(64, '0')
    }${''.padEnd(64, '0')               // amount0Min 0x264
    }${''.padEnd(64, '0')               // amount1Min 0x284
                                        // recipient 0x2a4
    }${wallet.address.slice(2).padStart(64, '0') 
    }${''.padEnd(64, 'f')               // deadline 0x2c4
    }${''.padEnd((32 - 4) * 2, '0')     // filler so the next part starts on a new word 0x2e4
    }${'4'.padStart(64, '0')            // length of 3rd set of bytes 0x300
    }${selector('refundETH()').slice(2) // third set of bytes selector 0x320
    }${''.padEnd((32 - 4) * 2, '0')}`   // filler so this ends as a full word 0x324

const f = await Deno.makeTempFile()
await Deno.writeTextFile(f, JSON.stringify(await node.traceCall({ input, from: wallet.address, to: nonfungiblePositionManager.address, value: 10n ** 18n }, 'latest'), undefined, 4))
console.log(f)

// get gasLimit
const gasLimit = await node.estimateGas({ input, from: wallet.address, to: nonfungiblePositionManager.address, value: 10n ** 18n }, 'latest')
console.log({ gasLimit })

// sign tx
const signedTx = wallet.signTx({ nonce: 2n, gasLimit, data: input, gasPrice: await node.gasPrice(), chainId: await node.chainId(), to: nonfungiblePositionManager.address, value: 10n ** 18n })

// send tx
const hash = await node.sendRawTx(signedTx)

await node.wait(hash)

Deno.test('dzhv balance of wallet', async () => {
    const balance = await node.call({ to: dzhv.address, input: `${selector('balanceOf(address)')}${wallet.address.slice(2).padStart(64, '0')}` }, 'latest')
    console.log({ balance: BigInt(balance) })
})