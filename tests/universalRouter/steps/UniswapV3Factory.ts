import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { Solc } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/solc@0.0.2/mod.ts'
import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'

export async function UniswapV3Factory({
    session:{ node, signers: { root } }, nonce
}:{
    session:{ node:Node, signers:{ root:Signer } }, nonce:bigint
}) {

    // get code
    const solcDir = fromFileUrl(import.meta.resolve('../../../.cache'))
    const projDir = fromFileUrl(import.meta.resolve('../projects/UniswapV3Factory'))
    const solcJsonInputPath = `${projDir}/settings.json`
    const results = await Solc.compile(solcJsonInputPath, solcDir)
    const bytecode = results?.contracts?.['UniswapV3Factory.sol']?.['UniswapV3Factory']?.evm?.bytecode?.object
    const uniswapV3PoolInitCode = results?.contracts?.['UniswapV3Pool.sol']?.['UniswapV3Pool']?.evm?.bytecode?.object
    if (!bytecode) throw new Error('!bytecode')
    if (!uniswapV3PoolInitCode) throw new Error('!uniswapV3PoolInitCode')
    const uniswapV3PoolInitCodeHash = keccak256(Uint8Array.from(            // turn into a uint8array then hash:
        Array.from(uniswapV3PoolInitCode).reduce<string[]>((p, c, i) =>     // a reduction of the array form of the init code produced by:
            (i % 2 ? p[p.length - 1] += c : p.push(c), p), []               // turning the hex string into a list of byte sized hex nibbles
        ).map(b => Number(`0x${b}`))                                        // mapped into numbers
    ))
    const input = `0x${bytecode}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: root.address }, 'latest')
    
    // sign tx
    const signedTx = root.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice() })

    // get address
    const address = `0x${keccak256(encode([root.address, nonce])).slice(-40)}`

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { uniswapV3Factory: { address, hash }, uniswapV3PoolInitCodeHash }

}