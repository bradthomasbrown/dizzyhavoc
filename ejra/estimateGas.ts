import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

type Opts = { call:Partial<Call>, tag?:Tag }

export default function ({ call, tag='latest' }:Opts) {
    const schema = z.string().transform(str => BigInt(str))
    const params = [call, tag] as const
    const method = 'eth_estimateGas' as const
    return { method, params, schema }
}