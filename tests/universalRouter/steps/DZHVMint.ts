import { Signer, Node, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts';

export async function DZHVMint({
    session:{ node, signers: { wallet } },
    dzhv,
    nonce
}:{
    session:{ node:Node, signers: { wallet:Signer } }
    dzhv:{ address:string }
    nonce:bigint
}) {

    // build input
    const input = `${selector('mint(address,uint256)')              // mint(address addr, uint val)
     }${wallet.address.slice(2).padStart(64, '0')                   // mint to wallet
     }${(10n ** 9n * 10n ** 18n).toString(16).padStart(64, '0')}`   // mint 1b tokens


    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: wallet.address, to: dzhv.address }, 'latest')
    
    // sign tx
    const signedTx = wallet.signTx({ nonce, gasLimit, data: input, gasPrice: await node.gasPrice(), chainId: await node.chainId(), to: dzhv.address })

    // send tx
    const hash = await node.sendRawTx(signedTx)

    // return hash
    return { hash }

}