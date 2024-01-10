import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

type Opts = { address:string, slot:bigint, tag?:Tag }

export default function ({ address, slot, tag='latest' }:Opts) {
    const schema = z.string()
    const params = [address, slot, tag] as const
    const method = 'eth_getStorageAt' as const
    return { method, params, schema }
}