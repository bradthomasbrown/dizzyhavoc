import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

type TraceTxConfig = {
    disableStorage?:boolean
    disableStack?:boolean
    enableMemory?:boolean
    enableReturnData?:boolean
    tracer?:string
}
type Opts = { call:Call, tag?:Tag, config?:TraceTxConfig }

export default function ({ call, tag='latest', config={ enableMemory:true, enableReturnData:true } }:Opts) {
    const schema = z.any()
    const params = [call, tag, config] as const
    const method = 'debug_traceCall' as const
    return { method, params, schema }
}