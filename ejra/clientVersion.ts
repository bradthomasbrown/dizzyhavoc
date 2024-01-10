import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export default function () {
    const schema = z.string()
    const method = 'web3_clientVersion' as const
    return { method, schema }
}