import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.3/lib/mod.ts'
import { selector, Signer } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.1/lib/mod.ts'

export async function mint({
    session, nonce, address, value, dzhv
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint, dzhv:{ address: string }, address:string, value:bigint
}) {

    // extract info from session
    const { signers:{ wallet }, url } = session

    // get code
    const input = `${selector('mint(address,uint256)')}${
        address.slice(2).padStart(64, '0')
     }${value.toString(16).padStart(64, '0')}`

    // get gasLimit
    const txCallObject = { input, from: wallet.address, to: dzhv.address }
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 0n)
    
    // sign tx
    const tx = { nonce, gasLimit, data: input, ...session, to: dzhv.address, eip: 'eip-155' } as const
    const signedTx = wallet.signTx(tx)!

    // deploy
    const hash = await ejra.methods.sendRawTx(url, signedTx)

    // return contract and deployment info
    return { hash }

}