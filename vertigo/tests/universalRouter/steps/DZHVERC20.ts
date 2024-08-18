import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';
import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { Signer, Node } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.5/lib/mod.ts'
import { Solc } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/solc@0.0.6/mod.ts'

export async function DZHVERC20({
    session:{ node, signers:{ deployer, wallet, bridge, destroyer } },
    dzhvCreate2,
    nonce, salt
}:{
    session:{ node:Node, signers: { deployer:Signer, wallet:Signer, bridge:Signer, destroyer:Signer } }
    dzhvCreate2:{ address:string } 
    nonce:bigint, salt:bigint
}) {
    
    // get code
    const solcDir = fromFileUrl(import.meta.resolve('../../../.cache'))
    const projDir = fromFileUrl(import.meta.resolve('../projects/DZHV'))
    const code = Deno.readTextFileSync(`${projDir}/ERC20_20240228_slipbridge.sol`)
        .replace(/\?W\?+/g, wallet.address.slice(2))
        .replace(/\?B\?+/g, bridge.address.slice(2))
        .replace(/\?D\?+/g, destroyer.address.slice(2))
    const results = await Solc.compileSimple(code, solcDir)
    const bytecode = results?.contracts?.['<stdin>']?.['ERC20']?.evm?.bytecode?.object
    if (!bytecode) throw new Error('!bytecode')
    const saltStr = salt.toString(16).padStart(64, '0')
    const input = `0x${saltStr}${bytecode}`

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: deployer.address, to: dzhvCreate2.address }, 'latest') + 19900n
    
    // sign tx
    const signedTx = deployer.signTx({ nonce, gasLimit, data: input, chainId: await node.chainId(), gasPrice: await node.gasPrice(), to: dzhvCreate2.address })

    // get address
    const address = `0x${keccak256(hexToBytes(`ff${dzhvCreate2.address.slice(2)}${saltStr}${keccak256(hexToBytes('6020343434335afa3451803b343482933c34f3'))}`)).slice(-40)}`

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { address, hash }

}