import { Signer, Node, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts';

export async function mint({
    session:{ node, signers: { wallet } },
    dzhv,
    nonce,
    address, value
}:{
    session:{ node:Node, signers: { wallet:Signer } },
    dzhv:{ address: string }
    nonce:bigint,
    address:string, value:bigint
}) {

    // get code
    const input = `${selector('mint(address,uint256)')}${
        address.slice(2).padStart(64, '0')
     }${value.toString(16).padStart(64, '0')}`

    const f = Deno.makeTempFileSync()
    Deno.writeTextFileSync(f, JSON.stringify(await node.traceCall({ input, from: wallet.address, to: dzhv.address }, 'latest'), undefined, 4))
    console.log(f)

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: wallet.address, to: dzhv.address }, 'latest')
    
    // sign tx
    const signedTx = wallet.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice(), to: dzhv.address })

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { hash }

}