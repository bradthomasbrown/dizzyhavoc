import { Signer, signRawTx } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.1/lib/mod.ts'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.8/lib/mod.ts'
import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';

const contractsDir = fromFileUrl(import.meta.resolve('../../../contracts'))

const getC2Addr = ({ salt, create2 }:{ salt:bigint, create2:{ address:string }}) => {
    const saltStr = salt.toString(16).padStart(64, '0')
    return `0x${keccak256(hexToBytes(`ff${create2.address.slice(2)}${saltStr}${keccak256(hexToBytes('6020343434335afa3451803b343482933c34f3'))}`)).slice(-40)}`
}

export async function dzhvFix({
    session, nonce, create2, salt
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint, create2:{ address:string }, salt:bigint
}) {

    // extract info from session
    const { signers:{ deployer, destroyer }, url } = session

    // get code
    const saltStr = salt.toString(16).padStart(64, '0')
    const input = `0x${saltStr}${Deno.readTextFileSync(`${contractsDir}/dzhv/dzhv_20240119_excessZeroesFix`)
        .split('\n')
        .at(-1)!
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?R\?+/g, ''.padEnd(40, '0'))}` // dummy resolver, not needed for the dzhv deploy test

    // get gasLimit
    const txCallObject = { input, from: deployer.address, to: create2.address }
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 'latest')
    
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