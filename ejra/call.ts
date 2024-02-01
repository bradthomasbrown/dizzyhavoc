import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type Opts = { tx:Call, tag?:Tag }

export default function ({ tx, tag='latest' }:Opts) {
    const schema = z.string()
    const params = [tx, tag] as const
    const method = 'eth_call' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}