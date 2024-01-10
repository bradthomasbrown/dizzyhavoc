import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export default function () {
    const schema = z.string().transform(str => BigInt(str))
    const method = 'eth_chainId' as const
    return { method, schema }
}