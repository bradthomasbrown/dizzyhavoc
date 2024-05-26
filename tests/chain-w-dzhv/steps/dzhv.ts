import { Signer, signRawTx } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.1/lib/mod.ts'
import { getC2Addr } from '../../../lib/mod.ts'
import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.3/lib/mod.ts'
import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';

const contractsDir = fromFileUrl(import.meta.resolve('../../../contracts'))

export async function dzhv({
    session, nonce, create2, resolver, salt, 
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint, create2:{ address:string }, resolver:{ address:string }, salt:bigint
}) {

    // extract info from session
    const { signers:{ deployer, destroyer }, url } = session

    // get code
    const input = `0x${Deno.readTextFileSync(`${contractsDir}/dzhv/dzhv_20240119`)
        .split('\n')
        .at(-1)!
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?R\?+/g, resolver.address.slice(2))}`

    // get gasLimit
    const txCallObject = { input, from: deployer.address, to: create2.address }
    console.log(JSON.stringify({ url, txCallObject }))
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 0n)
    
    // sign tx
    const tx = { signer: deployer, nonce, gasLimit, data: input, ...session, to: create2.address, eip: 'eip-155' } as const
    const signedTx = signRawTx(tx)!

    // get address
    const address = getC2Addr({ salt, create2 })

    // deploy
    const hash = await ejra.methods.sendRawTx(url, signedTx)

    // return contract and deployment info
    return { address, hash }

}