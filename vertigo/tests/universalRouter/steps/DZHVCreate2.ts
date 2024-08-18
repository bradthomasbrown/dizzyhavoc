import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'

export async function DZHVCreate2({
    session:{ node, signers: { deployer } }, nonce
}:{
    session:{ node:Node, signers:{ deployer:Signer } }, nonce:bigint
}) {

    // get code
    const projDir = fromFileUrl(import.meta.resolve('../projects/DZHV'))
    const input = `0x${Deno.readTextFileSync(`${projDir}/create2_20240118`)
        .split('\n')
        .at(-1)!
        .replace(/\?D\?+/g, deployer.address.slice(2))}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: deployer.address }, 'latest')
    
    // sign tx
    const signedTx = deployer.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice() })

    // get address
    const address = `0x${keccak256(encode([deployer.address, nonce])).slice(-40)}`

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { address, hash }

}