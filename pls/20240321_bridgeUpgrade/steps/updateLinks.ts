import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    resolver, upgrade, nonce=0n,
    execute, traceTx, traceCall
}:{
    session:{ implementer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    resolver:{ address:string }, upgrade: { address:string }, nonce?:bigint
    execute?:boolean, traceTx?:boolean, traceCall?:boolean
}) {
    const { implementer, url, gasTotals, interval } = session                   // Config { address server; uint32[] selectors; }
    const data = `${'0x3608adf5'}${                                             // Resolver.setImplementations(Config[] calldata configs)
           '0000000000000000000000000000000000000000000000000000000000000020'   // configs offset
        }${'0000000000000000000000000000000000000000000000000000000000000001'   // configs length
        }${'0000000000000000000000000000000000000000000000000000000000000020'   // config0 offset
        }${'000000000000000000000000?U??????????????????????????????????????'   // config0.server
        }${'0000000000000000000000000000000000000000000000000000000000000040'   // config0.selectors offset
        }${'0000000000000000000000000000000000000000000000000000000000000002'   // config0.selectors length
        }${'000000000000000000000000000000000000000000000000000000009eea5f66'   // burn
        }${'0000000000000000000000000000000000000000000000000000000040c10f19'}` // singlemint
        .replace(/\?U\?+/g, upgrade.address.slice(2))
    const call = { input: data, from: implementer.address, to: resolver.address }
    const gasLimit = await e.estimateGas({ call }).call(url) * 200n / 100n
    if (execute) gasTotals.set('implementer', (gasTotals.get('implementer') ?? 0n) + gasLimit)
    if (prompt(`updateLinks gasLimit is ${gasLimit}`) != 'y') throw new Error(`updateLinks gasLimit of ${gasLimit} not approved`)
    const tx = { signer: implementer, nonce, gasLimit, data, ...call, ...session }
    const { signedTx, hash } = signRawTx(tx)
    console.log('updateLinks', { hash })
    const updateLinks = { hash, ...e.sendRawTx({ signedTx }) }
    if (execute) {
        e.ejrc({ url, ...updateLinks })
        while (!await e.receipt({ ...updateLinks }).call(url)) await new Promise(r => setTimeout(r, interval))
    }
    if (traceTx) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceTx({ ...updateLinks }).call(url), undefined, 4))
        console.log(temp)
    }
    if (traceCall) {
        const temp = Deno.makeTempFileSync()
        Deno.writeTextFileSync(temp, JSON.stringify(await e.traceCall({ tx }).call(url), undefined, 4))
        console.log(temp)
    }
    return updateLinks
}