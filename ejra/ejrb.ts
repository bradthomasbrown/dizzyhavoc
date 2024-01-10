import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

export default function<
    E extends readonly { method:string, params?:P, schema:S }[],
    P extends readonly unknown[],
    S extends z.ZodTypeAny
>({ url, ejrrqs }:{ url:string, ejrrqs:E }) {
    const jrrqs = ejrrqs.map(({ method, params }, i) =>
        ({ jsonrpc: '2.0', method, params: params ?? [] as const, id: i }))
    const body = JSON.stringify(jrrqs, (_, v) => typeof v == 'bigint' ? `0x${v.toString(16)}` : v)
    const headers = { 'Content-Type': 'application/json' } as const
    const init = { body, headers, method: 'POST' } as const
    return fetch(url, init)
        .then(response => response.json())
        .then(json => z.object({ result: z.unknown(), id: z.number() }).array().length(ejrrqs.length).parseAsync(json))
        .then(jrrss => Promise.all(ejrrqs.map(({ schema }, i) => schema.parseAsync(jrrss.find(({ id }) => i == id)?.result))) as
            { [P in keyof E]: E[P]['schema'] extends z.ZodTypeAny ? z.infer<E[P]['schema']> : never })
}