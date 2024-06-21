import { Signer, signRawTx } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.1/lib/mod.ts'
import { Kanta } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.3/lib/kanta/Kanta.ts'
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

export async function resolver({
    session, nonce, create2, salt, kanta
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint, create2:{ address:string }, salt:bigint,
    kanta:Kanta
}) {

    // extract info from session
    const { signers:{ deployer, implementer, destroyer, wallet }, url } = session

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
    const txCallObject = { input, from: deployer.address, to: create2.address, nonce: '0x1' }
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 'latest') + 19900n
    console.log({ gasLimit })

    // calldata gas calc
    const cdata = input.slice(2)
    const cdata_ones = cdata.match(/../g)!.filter(b => b != '00')
    const cdata_zeroes = cdata.match(/../g)!.filter(b => b == '00')
    // console.log({ cdata_ones, cdata_zeroes })
    console.log(BigInt(cdata_ones.length) * 16n + BigInt(cdata_zeroes.length) * 4n)
    
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