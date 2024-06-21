import { Signer, Node, Kanta } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'
import { getC2Addr } from '../../../lib/mod.ts'
import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';

const contractsDir = fromFileUrl(import.meta.resolve('../../../contracts'))

export async function resolver({
    session:{
        node, kanta,
        signers: { deployer, implementer, destroyer, wallet }
    },
    create2,
    nonce, salt
}:{
    session:{
        node:Node, kanta:Kanta,
        signers: { deployer:Signer, implementer:Signer, destroyer:Signer, wallet:Signer }
    },
    create2:{ address:string } 
    nonce:bigint, salt:bigint
}) {
    
    // get code
    const code = Deno.readTextFileSync(`${contractsDir}/Resolver/Resolver.sol`)
        .replace(/\?I\?+/g, implementer.address.slice(2))   // dummy implementer
        .replace(/\?D\?+/g, destroyer.address.slice(2))     // dummy destroyer
        .replace(/\?W\?+/g, wallet.address.slice(2))        // dummy wallet
    const { contracts } = await kanta.compile(code)
    const { bytecode } = contracts?.['Resolver']!
    const saltStr = salt.toString(16).padStart(64, '0')
    const input = `0x${saltStr}${bytecode}`

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