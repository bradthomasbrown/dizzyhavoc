import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type TraceTxConfig = {
    disableStorage?:boolean
    disableStack?:boolean
    enableMemory?:boolean
    enableReturnData?:boolean
    tracer?:string
}
type Opts = { hash:string, config?:TraceTxConfig }

export default function ({ hash, config={ enableMemory:true, enableReturnData:true } }:Opts) {
    const schema = z.any()
    const params = [hash, config] as const
    const method = 'debug_traceTransaction' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}