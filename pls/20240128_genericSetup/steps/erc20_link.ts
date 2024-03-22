import { Signer, signRawTx } from '../../../lib/mod.ts'
import * as e from '../../../ejra/mod.ts'

export default async function({
    session,
    resolver, erc20, nonce=0n,
    execute, traceTx, traceCall
}:{
    session:{ implementer:Signer, url:string, gasPrice:bigint, chainId:bigint, gasTotals:Map<string,bigint>, interval:number },
    resolver:{ address:string }, erc20: { address:string }, nonce?:bigint
    execute?:boolean, traceTx?:boolean, traceCall?:boolean
}) {
    const { implementer, url, gasTotals, interval } = session                   // Config { address server; uint32[] selectors; }
    const data = `${'0x3608adf5'}${                                             // Resolver.setImplementations(Config[] calldata configs)
           '0000000000000000000000000000000000000000000000000000000000000020'   // configs offset
        }${'0000000000000000000000000000000000000000000000000000000000000001'   // configs length
        }${'0000000000000000000000000000000000000000000000000000000000000020'   // config0 offset
        }${'000000000000000000000000?C??????????????????????????????????????'   // config0.server
        }${'0000000000000000000000000000000000000000000000000000000000000040'   // config0.selectors offset
        }${'000000000000000000000000000000000000000000000000000000000000000a'   // config0.selectors length
        }${'00000000000000000000000000000000000000000000000000000000dd62ed3e'   // allowance
        }${'00000000000000000000000000000000000000000000000000000000095ea7b3'   // approve
        }${'0000000000000000000000000000000000000000000000000000000070a08231'   // balanceOf
        }${'00000000000000000000000000000000000000000000000000000000313ce567'   // decimals
        }${'000000000000000000000000000000000000000000000000000000007e0b4201'   // multimint
        }${'0000000000000000000000000000000000000000000000000000000006fdde03'   // name
        }${'0000000000000000000000000000000000000000000000000000000095d89b41'   // symbol
        }${'0000000000000000000000000000000000000000000000000000000018160ddd'   // totalSupply
        }${'00000000000000000000000000000000000000000000000000000000a9059cbb'   // transfer
        }${'0000000000000000000000000000000000000000000000000000000023b872dd'}` // transferFrom
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