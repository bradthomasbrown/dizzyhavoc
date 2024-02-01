import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import ejrc from './ejrc.ts'

type TraceTxConfig = {
    disableStorage?:boolean
    disableStack?:boolean
    enableMemory?:boolean
    enableReturnData?:boolean
    tracer?:string
}
type Opts = { tx:Partial<Call>, tag?:Tag, config?:TraceTxConfig }

export default function ({ tx, tag='latest', config={ enableMemory:true, enableReturnData:true } }:Opts) {
    const schema = z.any()
    const params = [tx, tag, config] as const
    const method = 'debug_traceCall' as const
    const ejrrq = { method, params, schema }
    return { ejrrq, call: (url:string) => ejrc({ url, ejrrq }) }
}