import * as ejra from 'https://deno.land/x/ejra@0.2.1/mod.ts'

export type KvBurn = {
    hash:string
    value:bigint
    recipient:string
    source:bigint
    destination:bigint
    log:ejra.types.Log
}