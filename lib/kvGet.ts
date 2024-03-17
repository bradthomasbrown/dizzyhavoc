import { LogLevel } from '../types/mod.ts'
import { Logger, Cache } from '../classes/mod.ts'
import { kv, kvRlb as rlb } from './mod.ts'

export async function kvGet<T>(key:Deno.KvKey):Promise<T|null|undefined> {

    const get = kv.get<T>

    console.log('#x')
    rlb.delay = await Cache.get('kvRlbDelay')
    console.log('#y')
    rlb.lim = await Cache.get('kvRlbLim')
    console.log('#z')

    await Logger.detail(`kvGet: sending key [${key}] request`)

    const result = await Logger.wrap(
        rlb.regulate({ fn: get.bind(kv), args: [key] as const }),
        `kvGet: key [${key}] request failure`,
        LogLevel.DETAIL,
        `kvGet: key [${key}] request success`
    )

    if (result === null) return null
    
    if (result.value === null) return undefined

    return result.value

}