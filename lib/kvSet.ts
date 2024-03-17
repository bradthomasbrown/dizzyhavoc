import { LogLevel } from '../types/mod.ts'
import { Logger, Cache } from '../classes/mod.ts'
import { kv, kvRlb as rlb } from './mod.ts'

const replacer=(_:unknown,v:unknown)=>typeof v=='bigint'?''+v:v

export async function kvSet<T>(key:Deno.KvKey, value:T):Promise<true|null> {

    const set = kv.set

    rlb.delay = await Cache.get('kvRlbDelay')
    rlb.lim = await Cache.get('kvRlbLim')

    await Logger.detail(`kvSet: sending KV set request key [${key}] value ${JSON.stringify(value, replacer)}`)

    const result = await Logger.wrap(
        rlb.regulate({ fn: set.bind(kv), args: [key, value] as const }),
        `kvSet: key [${key}] value ${JSON.stringify(value, replacer)} set failure`,
        LogLevel.DETAIL,
        `kvSet: key [${key}] value ${JSON.stringify(value, replacer)} set success`
    )

    return result?.ok ?? null

}