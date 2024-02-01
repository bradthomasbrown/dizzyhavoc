import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    resolver, nonce,
    execute, traceTx, traceCall
}:{
    session:{ implementer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    resolver:{ address:string }, nonce:bigint,
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { implementer, url, gasTotals, interval } = session
    const data = '0x3608adf5000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000?F??????????????????????????????????????000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000081bf643a'
        .replace(/\?F\?+/g, ''.padEnd(40, '0'))
    const call = { input: data, from: implementer.address, to: resolver.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('implementer', (gasTotals.get('implementer') ?? 0n) + gasLimit)
    if (prompt(`Fix_unlink gasLimit is ${gasLimit}`) != 'y') throw new Error(`Fix_unlink gasLimit of ${gasLimit} not approved`)
    const tx = { signer: implementer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    console.log('Fix_unlink', { hash })
    const Fix_unlink = { hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...Fix_unlink })
        while (!await e.receipt({ ...Fix_unlink }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...Fix_unlink }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return Fix_unlink
}