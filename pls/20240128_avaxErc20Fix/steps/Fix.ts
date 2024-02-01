import { Signer, getCode, getC2Addr, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    create2, salt, nonce,
    execute, traceTx, traceCall
}:{
    session:{ deployer:Signer, destroyer:Signer, wallet:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    create2:{ address:string }, salt:bigint, nonce:bigint,
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { deployer, destroyer, wallet, url, gasTotals, interval } = session
    const saltStr = salt.toString(16).padStart(64, '0')
    const code = (getCode('EventFix20240128/EventFix20240128.sol') as string)
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?W\?+/g, wallet.address.slice(2))
    const data = `0x${saltStr}${code}`
    const call = { input: data, from: deployer.address, to: create2.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`Fix gasLimit is ${gasLimit}`) != 'y') throw new Error(`Fix gasLimit of ${gasLimit} not approved`)
    const tx = { signer: deployer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = getC2Addr({ salt, create2 })
    console.log('Fix', { address, hash })
    const Fix = { address, hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...Fix })
        while (!await e.receipt({ ...Fix }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    console.log('Fix', (await e.code({ ...Fix }).call(url)).length)
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...Fix }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return Fix
}