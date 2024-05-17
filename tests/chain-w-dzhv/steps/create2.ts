import { Signer, getCode, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import * as kanta from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/kanta@0.0.1/mod.ts'

export default async function({
    session,
    nonce=0n,
    execute, traceTx, traceCall
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:bigint }
    nonce?:bigint
    execute?:boolean, traceTx?:boolean, traceCall?:boolean
}) {

    // extract info from session
    const { signers:{ deployer }, url } = session

    // get code
    const client = new kanta.Client('http://node')
    const code = (getCode('create2/create2_20240118') as string)
        .replace(/\?D\?+/g, deployer.address.slice(2))

    // get gasLimit
    const data = `0x${code}`
    const call = { input: data, from: deployer.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    
    // create signRawTx
    const tx = { signer: deployer, nonce, gasLimit, data, ...session }
    const { signedTx, hash } = signRawTx(tx)

    // get address
    const address = `0x${keccak256(encode([deployer.address, nonce])).slice(-40)}`

    // deploy and wait for receipt
    const create2 = { address, hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...create2 })
        while (!await e.receipt({ ...create2 }).call(url)) await new Promise(r => setTimeout(r, interval))
    }

    // optionally trace tx
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...create2 }).call(url), undefined, 4))
        console.log(temp)
    }

    // optionally trace call
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }

    // return contract and deployment info
    return create2

}