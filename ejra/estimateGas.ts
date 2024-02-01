import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type Opts = { call:Partial<Call>, tag?:Tag }

export default function ({ call, tag='latest' }:Opts) {
    if (call.data) { call.input = call.data; delete call.data }
    const schema = z.string().transform(str => BigInt(str))
    const params = [call, tag] as const
    const method = 'eth_estimateGas' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}