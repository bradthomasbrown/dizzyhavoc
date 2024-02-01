import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type Opts = { signedTx:string }

export default function ({ signedTx }:Opts) {
    const schema = z.string()
    const method = 'eth_sendRawTransaction'
    const params = [signedTx] as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}
