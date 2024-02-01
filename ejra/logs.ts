import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type Opts = { filter:Filter }

// removed:boolean
// logIndex:bigint|null
// transactionIndex:bigint|null
// transactionHash:string|null
// blockHash:string|null
// blockNumber:bigint|null
// address:string
// data:string
// topics:string[]

export default function ({ filter }:Opts) {
    const schema = z.object({
        removed: z.boolean(),
        logIndex: z.string().nullable().transform(str => str === null ? str : BigInt(str)),
        transactionIndex: z.string().transform(str => str === null ? null : BigInt(str)),
        transactionHash: z.string().nullable(),
        blockHash: z.string().nullable(),
        blockNumber: z.string().nullable().transform(str => str === null ? null : BigInt(str)),
        address: z.string(),
        data: z.string(),
        topics: z.string().array()
    }).array()
    const params = [filter] as const
    const method = 'eth_getLogs' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}