import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    Fix, nonce,
    execute, traceTx, traceCall
}:{
    session:{ destroyer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    Fix: { address:string }, nonce:bigint,
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { destroyer, url, gasTotals, interval } = session
    const data = '0x'
    const call = { input: data, from: destroyer.address, to: Fix.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('destroyer', (gasTotals.get('destroyer') ?? 0n) + gasLimit)
    if (prompt(`destroyFix gasLimit is ${gasLimit}`) != 'y') throw new Error(`destroyFix gasLimit of ${gasLimit} not approved`)
    const tx = { signer: destroyer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    console.log('destroyFix', { hash })
    const destroyFix = { hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...destroyFix })
        while (!await e.receipt({ ...destroyFix }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...destroyFix }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return destroyFix
}