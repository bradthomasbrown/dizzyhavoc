import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { Solc } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/solc@0.0.2/mod.ts'
import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'

export async function UniswapV2Factory({
    session:{ node, signers: { root } }, nonce
}:{
    session:{ node:Node, signers:{ root:Signer } }, nonce:bigint
}) {

    // get code
    const solcDir = fromFileUrl(import.meta.resolve('../../../.cache'))
    const projDir = fromFileUrl(import.meta.resolve('../projects/UniswapV2Factory'))
    const solcJsonInputPath = `${projDir}/settings.json`
    const results = await Solc.compile(solcJsonInputPath, solcDir)
    const bytecode = results?.contracts?.['UniswapV2Factory.sol']?.['UniswapV2Factory']?.evm?.bytecode?.object
    const uniswapV2PairInitCode = results?.contracts?.['UniswapV2Factory.sol']?.['UniswapV2Pair']?.evm?.bytecode?.object
    if (!bytecode) throw new Error('!bytecode')
    if (!uniswapV2PairInitCode) throw new Error('!uniswapV2PairInitCode')
    const uniswapV2PairInitCodeHash = keccak256(Uint8Array.from(            // turn into a uint8array then hash:
        Array.from(uniswapV2PairInitCode).reduce<string[]>((p, c, i) =>     // a reduction of the array form of the init code produced by:
            (i % 2 ? p[p.length - 1] += c : p.push(c), p), []               // turning the hex string into a list of byte sized hex nibbles
        ).map(b => Number(`0x${b}`))                                        // mapped into numbers
    ))
    const input = `0x${bytecode}${''.padEnd(64, '0')}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: root.address }, 'latest')
    
    // sign tx
    const signedTx = root.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice() })

    // get address
    const address = `0x${keccak256(encode([root.address, nonce])).slice(-40)}`

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { uniswapV2Factory: { address, hash }, uniswapV2PairInitCodeHash }

}