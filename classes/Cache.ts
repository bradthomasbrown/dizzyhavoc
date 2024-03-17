import { CacheEntry, KvCacheEntry, LogLevel } from '../types/mod.ts'
import { machineId, kvSet, kvGet } from '../lib/mod.ts'

type CacheKeys = 
     'level'
    |'delay'
    |'kvRlbDelay'
    |'kvRlbLim'
    |'evmRlbDelay'
    |'evmRlbLim'

export class Cache {

    // log level
    static level:CacheEntry<LogLevel> = {
        value: LogLevel.DEBUG,
        timestamp: Date.now(),
        expireIn: 30000,
        kvKey: ['level', machineId] as const,
        gate: null
    }

    // main loop delay
    static delay:CacheEntry<number> = {
        value: 5000,
        timestamp: Date.now(),
        expireIn: 30000,
        kvKey: ['delay', machineId] as const,
        gate: null
    }
    
    // kv rlb delay
    static kvRlbDelay:CacheEntry<number> = {
        value: 500,
        timestamp: Date.now(),
        expireIn: 30000,
        kvKey: ['kvRlbDelay', machineId] as const,
        gate: null
    }
    
    // kv rlb lim
    static kvRlbLim:CacheEntry<number> = {
        value: 1,
        timestamp: Date.now(),
        expireIn: 30000,
        kvKey: ['kvRlbLim', machineId] as const,
        gate: null
    }
    
    // evm rlb delay
    static evmRlbDelay:CacheEntry<number> = {
        value: 500,
        timestamp: Date.now(),
        expireIn: 30000,
        kvKey: ['evmRlbDelay', machineId] as const,
        gate: null
    }
    
    // evm rlb lim
    static evmRlbLim:CacheEntry<number> = {
        value: 1,
        timestamp: Date.now(),
        expireIn: 30000,
        kvKey: ['evmRlbLim', machineId] as const,
        gate: null
    }

    /**
     * Cache.get gets something from the memory cache
     * and attempts to ensure the response is up to date with its KV equivalent
     */
    static async get<T extends CacheKeys>(key:T) {

        // get the memory cache entry
        const memCacheEntry = Cache[key] 

        if (!memCacheEntry) throw new Error(`cache key ${key} does not exist`)

        // if memory cache entry is not expired, return it
        if (Date.now() < Cache[key].timestamp + Cache[key].expireIn) return Cache[key].value
        // otherwise, update the memory cache entry with its KV equivalent
        else {

            // if the memory cache entry has a gate set, return the memory entry
            // AKA "if someone's already updating the cache, don't also do that"
            if (Cache[key].gate) return Cache[key].value

            // set the gate so only one thing is in here at a time
            const gate = Promise.withResolvers<void>()
            Cache[key].gate = gate

            // attempt to get the KV equivalent cache object
            const kvCacheObject = await kvGet<KvCacheEntry<typeof memCacheEntry.value>>(Cache[key].kvKey)
            
            // on success, update the memory entry with the KV entry with an updated timestamp
            if (kvCacheObject) {
                Cache[key].value = kvCacheObject.value
                Cache[key].expireIn = kvCacheObject.expireIn
            }

            Cache[key].timestamp = Date.now()

            // resolve and nullify the previously set gate
            Cache[key].gate = null
            gate.resolve()

            // return the updated memory entry (or the old one if it failed to update)
            return Cache[key].value

        }
    }

    /**
     * Set the value of a cached entry in memory and in KV
     */
    static async set<
        K extends CacheKeys,
        V extends typeof Cache[K]['value']
    >(key:K, value:V) {

        Cache[key].value = value

        Cache[key].timestamp = Date.now()

        await kvSet(Cache[key].kvKey, {
            value: Cache[key].value,
            expireIn: Cache[key].expireIn
        })

    }

}