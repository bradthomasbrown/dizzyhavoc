import { Signer, getCode, getC2Addr, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    create2, salt, resolver, nonce=0n,
    execute, traceTx, traceCall
}:{
    session:{ deployer:Signer, destroyer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    create2:{ address:string }, salt:bigint, resolver:{ address:string }, nonce?:bigint
    execute?:true, traceTx?:true, traceCall?:true
}) {
    const { deployer, destroyer, url, gasTotals, interval } = session
    const saltStr = salt.toString(16).padStart(64, '0')
    const code = (getCode('dzhv/dzhv_20240119') as string)
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?R\?+/g, resolver.address.slice(2))
    const data = `0x${saltStr}${code}`
    const call = { input: data, from: deployer.address, to: create2.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`dzhv gasLimit is ${gasLimit}`) != 'y') throw new Error(`dzhv gasLimit of ${gasLimit} not approved`)
    const tx = { signer: deployer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = getC2Addr({ salt, create2 })
    console.log('dzhv', { address, hash })
    const dzhv = { address, hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...dzhv })
        while (!await e.receipt({ ...dzhv }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    console.log('dzhv', (await e.code({ ...dzhv }).call(url)).length)
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...dzhv }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return dzhv
}