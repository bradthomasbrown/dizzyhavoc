import { Signer, Node, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts';

export async function DZHVApproveNonfungiblePositionManager({
    session:{ node, signers: { wallet } },
    dzhv, nonfungiblePositionManager,
    nonce
}:{
    session:{ node:Node, signers: { wallet:Signer } }
    dzhv:{ address:string }, nonfungiblePositionManager:{ address:string }
    nonce:bigint
}) {

    // build input
    const input = `${selector('approve(address,uint256)')
        }${nonfungiblePositionManager.address.slice(2).padStart(64, '0')
        }${(2n ** 256n - 1n).toString(16)}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: wallet.address, to: dzhv.address }, 'latest')
    
    // sign tx
    const signedTx = wallet.signTx({ nonce, gasLimit, data: input, gasPrice: await node.gasPrice(), chainId: await node.chainId(), to: dzhv.address })

    // send tx
    const hash = await node.sendRawTx(signedTx)

    // return hash
    return { hash }

}