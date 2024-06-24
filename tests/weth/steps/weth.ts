import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { Signer, Node, Kanta } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts'

const contractsDir = fromFileUrl(import.meta.resolve('./contracts'))

export async function weth({
    session:{
        node, kanta,
        signers: { root }
    },
    nonce
}:{
    session:{
        node:Node, kanta:Kanta,
        signers: { root:Signer }
    },
    nonce:bigint
}) {

    // get code
    const code = Deno.readTextFileSync(`${contractsDir}/WETH9.sol`)
    const { contracts } = await kanta.compile(code)
    const { bytecode } = contracts?.['WETH9']!
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
    return { address, hash }

}