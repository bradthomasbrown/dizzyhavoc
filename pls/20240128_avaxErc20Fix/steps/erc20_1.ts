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
    const code = (getCode('ERC20/ERC20_20240127_1.sol') as string)
        .replace(/\?D\?+/g, destroyer.address.slice(2))
        .replace(/\?W\?+/g, wallet.address.slice(2))
    const data = `0x${saltStr}${code}`
    const call = { input: data, from: deployer.address, to: create2.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
    if (prompt(`erc20_1 gasLimit is ${gasLimit}`) != 'y') throw new Error(`erc20_1 gasLimit of ${gasLimit} not approved`)
    const tx = { signer: deployer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    const address = getC2Addr({ salt, create2 })
    console.log('erc20_1', { address, hash })
    const erc20_1 = { address, hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...erc20_1 })
        while (!await e.receipt({ ...erc20_1 }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    console.log('erc20', (await e.code({ ...erc20_1 }).call(url)).length)
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...erc20_1 }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return erc20_1
}