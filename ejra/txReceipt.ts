import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

type Opts = { txHash:string }

export default function ({ txHash }:Opts) {
    const schema = z.any()
    const params = [txHash] as const
    const method = 'eth_getTransactionReceipt' as const
    return { method, params, schema }
}