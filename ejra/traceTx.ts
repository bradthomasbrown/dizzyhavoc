import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

type TraceTxConfig = {
    disableStorage?:boolean
    disableStack?:boolean
    enableMemory?:boolean
    enableReturnData?:boolean
    tracer?:string
}
type Opts = { txHash:string, config?:TraceTxConfig }

export default function ({ txHash, config={ enableMemory:true, enableReturnData:true } }:Opts) {
    const schema = z.any()
    const params = [txHash, config] as const
    const method = 'debug_traceTransaction' as const
    return { method, params, schema }
}