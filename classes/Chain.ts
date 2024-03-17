import * as ejra from 'https://deno.land/x/ejra@0.2.1/mod.ts'
import { KvChain, KvFilter, LogLevel } from '../types/mod.ts'
import { Filter, Logger, Cache } from './mod.ts'
import { kvGet, kvIterate, machineId, evmRlb as rlb, burnTopic, tokenAddress, kv } from '../lib/mod.ts'

const replacer=(_:unknown,v:unknown)=>typeof v=='bigint'?''+v:v

export class Chain {

    chainId:bigint
    kvEntry?:Deno.KvEntry<KvChain>

    constructor({
        chainId, kvEntry
    }:{
        chainId:bigint,
        kvEntry?:Deno.KvEntry<KvChain>
    }) {
        this.chainId = chainId
        this.kvEntry = kvEntry
    }

    static async stalest():Promise<Chain|null> {

        // create variable to hold the stalest KvEntry<KvChain>
        let stalestEntry:Deno.KvEntry<KvChain>|undefined

        // iterate through KvChains
        for await (const entry of kvIterate<KvChain>(['chains'])) {

            // update stalest to the first entry if it's not set
            if (!stalestEntry) stalestEntry = entry
            
            // update stalest to new entry if entry is more stale
            if (entry.value.lastUpdated < (stalestEntry.value.lastUpdated))
                stalestEntry = entry

        }

        // if, after iterating, there's no stalestEntry, return null
        if (!stalestEntry) return null

        const chainId = stalestEntry.key[1] as bigint

        // create a chain class from the chainId (key index 1), assume type
        const chain = new Chain({ chainId, kvEntry: stalestEntry })

        // update the chain
        await chain.update()

        // return the chain
        return chain

    }

    async confirmations():Promise<bigint|null|undefined> {

        // try to get the confirmations needed for this chain
        const confirmations = await kvGet<bigint>(['confirmations', this.chainId])

        // return null if above fails
        if (confirmations === null) return null

        // return confirmations if it exists or undefined if it does not
        return confirmations

    }

    async active():Promise<boolean|null> {

        // try to get the KvChain for this chainId
        const kvChain = await kvGet<KvChain>(['chains', this.chainId])

        // return null if above fails
        if (kvChain === null) return null

        // return true if it exists or false if it does not
        return kvChain !== undefined

    }

    async filter():Promise<null|Filter> {

        // try to get the filter object for this chain and machine
        const get = kv.get<KvFilter>

        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')
        
        await Logger.detail(`Chain: sending chain ${this.chainId} filter request`)

        const kvEntry = await Logger.wrap(
            rlb.regulate({
                fn: get.bind(kv),
                args: [['filters', this.chainId, machineId]] as const 
            }),
            `Chain: chain ${this.chainId} filter request failure`,
            LogLevel.DETAIL,
            `Chain: chain ${this.chainId} filter request success`
        )

        // return null if the above fails
        if (kvEntry === null) return null
        
        // convert kvFilter into a filter class, new if undefined
        const filter = new Filter({
            filter: kvEntry.value ?? undefined,
            kvEntry
        })
    
        // if the filter is at least one block wide, return it
        if (filter.width > 0n) return filter

        console.log('#a')

        // otherwise, get the current height of the chain
        const height = await this.height()

        console.log('#a')

        // if that failed, return null, we cannot determine a filter
        if (!height) return null

        // update the height of the filter in memory
        filter.toBlock = height

        // if the filter isn't at least one block wide, return false
        if (filter.width <= 0) return filter
    
        // try to ensure that the filter width doesn't exceed the max, if applicable
        await filter.clip(this)

        // return filter
        return filter

    }

    async update():Promise<boolean|null> {

        // had to make this.kvEntry optional because
        // destination Chain won't have one
        // it also should never update
        // so this shouldn't really happen
        if (!this.kvEntry) return null

        const atom = kv.atomic()

        // create a new KvChain object
        const kvChain:KvChain = { lastUpdated: Date.now() }

        const commit = atom
            .check(this.kvEntry)
            .set(['chains', this.chainId], kvChain)
            .commit
            
        // attempt the commit

        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')
        
        await Logger.detail(`Chain: sending chain ${this.chainId} update request`)

        const result = await Logger.wrap(
            rlb.regulate({ fn: commit.bind(atom), args: [] }),
            `Chain: chain ${this.chainId} update request failure`,
            LogLevel.DETAIL,
            `Chain: chain ${this.chainId} update request success`
        )

        // return null if above request fails
        if (result === null) return null
        
        // return whether or not the commit succeeded
        return result.ok

    }

    async url():Promise<string|null|undefined> {

        // attempt to get the node url for this chain and machine
        const url = await kvGet<string>(['url', this.chainId, machineId])

        // return null if above fails
        if (url === null) return null

        // return the url or undefined if it doesn't exist
        return url

    }

    async height():Promise<bigint|null> {
    
        // get the url for this chain and machine
        const url = await this.url()
        
        // if this fails, return null
        if (!url) return null
    
        // attempt to get the height, wrap with Logger
        rlb.delay = await Cache.get('evmRlbDelay')
        rlb.lim = await Cache.get('evmRlbLim')

        await Logger.detail(`Chain: sending request for height of chain ${this.chainId}`)

        const height = await Logger.wrap(
            ejra.methods.height({ url, rlb }),
            `Chain: failed to retrieve chain ${this.chainId} height`,
            LogLevel.DETAIL,
            `Chain: successfully retrieved chain ${this.chainId} height`
        )
    
        // return height or null if above fails
        return height

    }

    async logs():Promise<ejra.types.Log[]|null|false> {

        console.log('0')

        // get the url for this chain and machine
        const url = await this.url()

        console.log('1')
        
        // if this fails, return null
        if (url === undefined) {
            await Logger.warn(`Chain: chain ${this.chainId} url not set`)
            return null
        }

        console.log('2')

        if (url === null) {
            await Logger.warn(`Chain: chain ${this.chainId} url retrieval failure`)
            return null
        }

        console.log('3')

        // get the filter for this chain and machine
        const filter = await this.filter()

        console.log('4')

        // return null if above fails
        if (filter === null) {
            await Logger.warn(`Chain: chain ${this.chainId} filter indeterminate`)
            return null
        }

        console.log('5')

        // return false if filter width < 1
        if (filter.width < 1n) {
            await Logger.info(`Chain: chain ${this.chainId} no new blocks (width ${filter.width}) ${JSON.stringify(filter, replacer)}`)
            return false
        }

        console.log('6')
    
        // attempt to get the burn logs, wrap with Logger

        rlb.delay = await Cache.get('evmRlbDelay')
        rlb.lim = await Cache.get('evmRlbLim')

        await Logger.info(`Chain: chain ${this.chainId} requesting logs with filter (width ${filter.width}) ${JSON.stringify(filter, replacer)}`)

        const logs = await Logger.wrap(
            ejra.methods.logs({
                url, rlb,
                filter: {
                    ...filter,
                    topics: [burnTopic],
                    address: tokenAddress
                }
            }),
            `Chain: failed to retrieve chain ${this.chainId} height`,
            LogLevel.DETAIL,
            `Chain: successfully retrieved chain ${this.chainId} height`
        )

        console.log('7')

        // if above request fails, bisect the filter and update it
        if (logs === null) filter.bisect()

        console.log('8')

        // if the above request succeeds, bump the filter (move it forward)
        if (logs) filter.bump()

        console.log('9')

        await filter.update(this)

        console.log('10')

        // return logs or null if above fails
        return logs

    }

}