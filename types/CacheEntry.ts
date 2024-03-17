export type CacheEntry<T> = {
    value:T
    timestamp:number
    expireIn:number
    kvKey:Deno.KvKey
    gate:ReturnType<typeof Promise.withResolvers<void>>|null
}