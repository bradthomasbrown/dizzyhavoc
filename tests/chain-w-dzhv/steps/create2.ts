import { Signer, signRawTx } from '../../../lib/mod.ts'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.3/lib/mod.ts'
import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';

const contractsDir = fromFileUrl(import.meta.resolve('../../../contracts'))

export async function create2({
    session, nonce,
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint
    execute?:boolean, traceTx?:boolean, traceCall?:boolean
}) {

    // extract info from session
    const { signers:{ deployer }, url } = session

    // get code
    const input = `0x${Deno.readTextFileSync(`${contractsDir}/create2/create2_20240118`)
        .split('\n')
        .at(-1)!
        .replace(/\?D\?+/g, deployer.address.slice(2))}`

    // get gasLimit
    const txCallObject = { input, from: deployer.address }
    console.log(JSON.stringify({ url, txCallObject }))
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 0n)
    
    // sign tx
    const tx = { signer: deployer, nonce, gasLimit, data: input, ...session }
    const { signedTx, hash } = signRawTx(tx)

    // get address
    const address = `0x${keccak256(encode([deployer.address, nonce])).slice(-40)}`

    // deploy
    ejra.methods.sendRawTx(url, signedTx)

    // return contract and deployment info
    return { address, hash }

}