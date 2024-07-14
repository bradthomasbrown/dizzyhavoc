import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { Solc } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/solc@0.0.2/mod.ts'
import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'

export async function UniversalRouter({
    session:{ node, signers: { root } }, nonce,
    weth, uniswapV2Factory, uniswapV3Factory,
    uniswapV2PairInitCodeHash, uniswapV3PoolInitCodeHash
}:{
    session:{ node:Node, signers:{ root:Signer } }, nonce:bigint
    weth:{ address:string, hash:string }
    uniswapV2Factory:{ address:string, hash:string }
    uniswapV3Factory:{ address:string, hash:string }
    uniswapV2PairInitCodeHash:string
    uniswapV3PoolInitCodeHash:string
}) {

    // get code
    const solcDir = fromFileUrl(import.meta.resolve('../../../.cache'))
    const projDir = fromFileUrl(import.meta.resolve('../projects/UniversalRouter'))
    const solcJsonInputPath = `${projDir}/settings.json`
    const results = await Solc.compile(solcJsonInputPath, solcDir)
    const bytecode = results?.contracts?.['UniversalRouter.sol']?.['UniversalRouter']?.evm?.bytecode?.object
    if (!bytecode) throw new Error('!bytecode')
    const input = `0x${bytecode}${                              // router bytecode
        ''.padEnd(64, '0')}${                                   // 0 address
        weth.address.slice(2).padStart(64, '0')}${              // weth address
        ''.padEnd(64 * 14, '0')}${                              // 14 consecutive 0 addresses
        uniswapV2Factory.address.slice(2).padStart(64, '0')}${  // v2factory address
        uniswapV3Factory.address.slice(2).padStart(64, '0')}${  // v3factory address
        uniswapV2PairInitCodeHash}${                            // v2pair init hash
        uniswapV3PoolInitCodeHash}`                             // v3pool init hash

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: root.address }, 'latest')
    
    // sign tx
    const signedTx = root.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice() })

    // get address
    const address = `0x${keccak256(encode([root.address, nonce])).slice(-40)}`

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { address, hash }

}