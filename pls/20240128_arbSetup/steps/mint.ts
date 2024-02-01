import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    dzhv, dies, nonce,
    execute, traceTx, traceCall
}:{
    session:{ wallet:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    dzhv:{ address:string }, dies:string, nonce:bigint,
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { wallet, url, gasTotals, interval } = session
    const data = dies
    const call = { input: data, from: wallet.address, to: dzhv.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('wallet', (gasTotals.get('wallet') ?? 0n) + gasLimit)
    if (prompt(`mint gasLimit is ${gasLimit}`) != 'y') throw new Error(`mint gasLimit of ${gasLimit} not approved`)
    const tx = { signer: wallet, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    console.log('mint', { hash })
    const mint = { hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...mint })
        while (!await e.receipt({ ...mint }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...mint }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return mint
}