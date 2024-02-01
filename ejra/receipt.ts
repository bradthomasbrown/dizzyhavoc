import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type Opts = { hash:string }

export default function ({ hash }:Opts) {
    const schema = z.object({
        transactionHash: z.string(),
        transactionIndex: z.string().transform(str => BigInt(str)),
        blockHash: z.string(),
        blockNumber: z.string().transform(str => BigInt(str)),
        from: z.string(),
        to: z.string().nullable(),
        gasUsed: z.string().transform(str => BigInt(str)),
        logs: z.object({
            removed: z.boolean(),
            logIndex: z.string().nullable().transform(str => str === null ? str : BigInt(str)),
            transactionIndex: z.string().transform(str => str === null ? null : BigInt(str)),
            transactionHash: z.string().nullable(),
            blockHash: z.string().nullable(),
            blockNumber: z.string().nullable().transform(str => str === null ? null : BigInt(str)),
            address: z.string(),
            data: z.string(),
            topics: z.string().array()
        }).array(),
        status: z.unknown()
    }).nullable()
    const params = [hash] as const
    const method = 'eth_getTransactionReceipt' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}