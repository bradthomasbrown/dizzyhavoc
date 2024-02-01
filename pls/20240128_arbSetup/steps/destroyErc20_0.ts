import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    erc20, nonce,
    execute, traceTx, traceCall
}:{
    session:{ destroyer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    erc20: { address:string }, nonce:bigint,
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { destroyer, url, gasTotals, interval } = session
    const data = '0x'
    const call = { input: data, from: destroyer.address, to: erc20.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('destroyer', (gasTotals.get('destroyer') ?? 0n) + gasLimit)
    if (prompt(`destroyErc20_0 gasLimit is ${gasLimit}`) != 'y') throw new Error(`destroyErc20_0 gasLimit of ${gasLimit} not approved`)
    const tx = { signer: destroyer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    console.log('destroyErc20_0', { hash })
    const destroyErc20_0 = { hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...destroyErc20_0 })
        while (!await e.receipt({ ...destroyErc20_0 }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...destroyErc20_0 }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return destroyErc20_0
}