import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts'
import { getC2Addr } from '../../../lib/mod.ts'
import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';

const contractsDir = fromFileUrl(import.meta.resolve('../../../contracts'))

export async function dzhv({
    session:{
        node,
        signers: { deployer, destroyer }
    },
    create2, resolver,
    nonce, salt
}:{
    session:{
        node:Node,
        signers: { deployer:Signer, destroyer:Signer }
    },
    create2:{ address:string }, resolver:{ address:string }
    nonce:bigint, salt:bigint
}) {

    // get code
    const saltStr = salt.toString(16).padStart(64, '0')
    const input = `0x${saltStr}${Deno.readTextFileSync(`${contractsDir}/dzhv/dzhv_20240119_excessZeroesFix`)
        .split('\n')
        .at(-1)!
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?R\?+/g, resolver.address.slice(2))}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: deployer.address, to: create2.address }, 'latest') + 19900n
    
    // sign tx
    const signedTx = deployer.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice(), to: create2.address })

    // get address
    const address = getC2Addr({ salt, create2 })

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { address, hash }

}