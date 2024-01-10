import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export default function <
    E extends { method:string, params?:P, schema:S },
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>({ url, ejrrq: { method, params, schema } }:{ url:string, ejrrq:E }) {
    const jrrq = { jsonrpc: '2.0', method, params: params ?? [] as const, id: 0 } as const
    const body = JSON.stringify(jrrq, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const
    return fetch(url, init)
        .then(response => response.json())
        .then(json => z.object({ result: z.unknown() }).parseAsync(json))
        .then(({ result }) => schema.parseAsync(result) as z.infer<E['schema']>)
}