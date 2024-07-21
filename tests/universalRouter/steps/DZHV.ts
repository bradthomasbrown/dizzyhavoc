import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'

export async function DZHV({
    session:{ node, signers: { deployer, destroyer } },
    dzhvCreate2, dzhvResolver,
    nonce, salt
}:{
    session:{ node:Node, signers:{ deployer:Signer, destroyer:Signer } }
    dzhvCreate2:{ address:string, hash:string }, dzhvResolver:{ address:string, hash:string }
    nonce:bigint, salt:bigint
}) {

    // get code
    const projDir = fromFileUrl(import.meta.resolve('../projects/DZHV'))
    const saltStr = salt.toString(16).padStart(64, '0')
    const input = `0x${saltStr}${Deno.readTextFileSync(`${projDir}/dzhv_20240119_excessZeroesFix`)
        .split('\n')
        .at(-1)!
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?R\?+/g, dzhvResolver.address.slice(2))}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: deployer.address, to: dzhvCreate2.address }, 'latest') + 19900n
    
    // sign tx
    const signedTx = deployer.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice(), to: dzhvCreate2.address })

    // get address
    const address = `0x${keccak256(hexToBytes(`ff${dzhvCreate2.address.slice(2)}${saltStr}${keccak256(hexToBytes('6020343434335afa3451803b343482933c34f3'))}`)).slice(-40)}`

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { address, hash }

}