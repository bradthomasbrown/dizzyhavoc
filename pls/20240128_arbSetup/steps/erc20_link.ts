import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    resolver, erc20, nonce=0n,
    execute, traceTx, traceCall
}:{
    session:{ implementer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    resolver:{ address:string }, erc20: { address:string }, nonce?:bigint
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { implementer, url, gasTotals, interval } = session
    const data = '0x3608adf5000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000?C??????????????????????????????????????0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000dd62ed3e00000000000000000000000000000000000000000000000000000000095ea7b30000000000000000000000000000000000000000000000000000000070a0823100000000000000000000000000000000000000000000000000000000313ce567000000000000000000000000000000000000000000000000000000007e0b42010000000000000000000000000000000000000000000000000000000006fdde030000000000000000000000000000000000000000000000000000000095d89b410000000000000000000000000000000000000000000000000000000018160ddd00000000000000000000000000000000000000000000000000000000a9059cbb0000000000000000000000000000000000000000000000000000000023b872dd'
        .replace(/\?C\?+/g, erc20.address.slice(2))
    const call = { input: data, from: implementer.address, to: resolver.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('implementer', (gasTotals.get('implementer') ?? 0n) + gasLimit)
    if (prompt(`erc20_link gasLimit is ${gasLimit}`) != 'y') throw new Error(`erc20_link gasLimit of ${gasLimit} not approved`)
    const tx = { signer: implementer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    console.log('erc20_link', { hash })
    const erc20_link = { hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...erc20_link })
        while (!await e.receipt({ ...erc20_link }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...erc20_link }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return erc20_link
}