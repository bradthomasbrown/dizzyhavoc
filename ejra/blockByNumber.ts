import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type Opts = { number:Tag, full?:boolean }

export default function ({ number, full=true }:Opts) {
    const schema = z.unknown()
    const params = [number, full] as const
    const method = 'eth_getBlockByNumber' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}