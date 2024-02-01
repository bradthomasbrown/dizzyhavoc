import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export default async function <
    E extends { method:string, params?:P, schema:S },
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>({ url, ejrrq: { method, params, schema } }:{ url:string, ejrrq:E }) {
    const jrrq = { jsonrpc: '2.0', method, params: params ?? [] as const, id: 0 } as const
    const body = JSON.stringify(jrrq, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const
    const response = await fetch(url, init)
    const json = await response.json()
    const { result, error } = await z.object({
        result: z.unknown(),
        error: z.object({ message: z.string() }).optional()
    }).parseAsync(json)
    if (error) throw new Error(error.message, { cause: JSON.stringify(json) })
    return schema.parseAsync(result) as z.infer<E['schema']>
}