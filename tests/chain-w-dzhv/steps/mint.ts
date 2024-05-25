import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.3/lib/mod.ts'

export async function mint({
    session, nonce, address, value, dzhv
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint, dzhv:{ address: string }, address:string, value:bigint
}) {

    // extract info from session
    const { signers:{ wallet }, url } = session

    // get code
    const input = `${'0x3608adf5'}${
        address.padStart(64, '0')
     }${value.toString(16).padStart(64, '0')}`

    // get gasLimit
    const txCallObject = { input, from: wallet.address, to: dzhv.address }
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 0n)
    
    // sign tx
    const tx = { signer: wallet, nonce, gasLimit, data: input, ...session, to: dzhv.address }
    const { signedTx, hash } = signRawTx(tx)

    // deploy
    ejra.methods.sendRawTx(url, signedTx)

    // return contract and deployment info
    return { hash }

}