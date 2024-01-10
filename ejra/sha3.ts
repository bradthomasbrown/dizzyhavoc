import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

type Opts = { data:string }

export default function ({ data }:Opts) {
    const schema = z.string()
    const method = 'web3_sha3'
    const params = [data] as const
    return { method, params, schema }
}
