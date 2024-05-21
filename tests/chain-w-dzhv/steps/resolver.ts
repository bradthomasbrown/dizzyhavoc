// import { Signer, getCode, getC2Addr, signRawTx } from '../../../lib/mod.ts'
// import * as e from '../../../ejra/mod.ts'

// export default async function({
//     session,
//     create2, salt, nonce=0n,
//     execute, traceTx, traceCall
// }:{
//     session:{ deployer:Signer, implementer:Signer, destroyer:Signer, wallet:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
//     create2:{ address:string }, salt:bigint, nonce?:bigint,
//     execute?:boolean, traceTx?:boolean, traceCall?:boolean
// }) {
//     const { deployer, implementer, destroyer, wallet, url, gasTotals, interval } = session
//     const saltStr = salt.toString(16).padStart(64, '0')
//     const code = (getCode('Resolver/Resolver.sol') as string)
//         .replace(/\?I\?+/g, implementer.address.slice(2))
//         .replace(/\?D\?+/g, destroyer.address.slice(2))
//         .replace(/\?W\?+/g, wallet.address.slice(2))
//     const data = `0x${saltStr}${code}`
//     const call = { input: data, from: deployer.address, to: create2.address }
//     const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
//     if (execute) gasTotals.set('deployer', (gasTotals.get('deployer') ?? 0n) + gasLimit)
//     if (prompt(`resolver gasLimit is ${gasLimit}`) != 'y') throw new Error(`resolver gasLimit of ${gasLimit} not approved`)
//     const tx = { signer: deployer, nonce, gasLimit, data, to: create2.address, ...session }
//     const { signedTx, hash } = signRawTx(tx)
//     const address = getC2Addr({ salt, create2 })
//     console.log('resolver', { address, hash })
//     const resolver = { address, hash, ...e.sendRawTx({ signedTx }) }
//     if (execute) {
//         e.ejrc({ url, ...resolver })
//         while (!await e.receipt({ ...resolver }).call(url)) await new Promise(r => setTimeout(r, interval))
//     }
//     console.log('resolver', (await e.code({ ...resolver }).call(url)).length)
//     if (traceTx) {
//         const temp = Deno.makeTempFileSync()
//         Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...resolver }).call(url), undefined, 4))
//         console.log(temp)
//     }
//     if (traceCall) {
//         const temp = Deno.makeTempFileSync()
//         Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
//         console.log(temp)
//     }
//     return resolver
// }