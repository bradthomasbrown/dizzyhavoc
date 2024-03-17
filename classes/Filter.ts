import { KvFilter, LogLevel } from '../types/mod.ts'
import { Chain, Logger, Cache } from './mod.ts'
import { kv, kvGet, kvRlb as rlb, machineId } from '../lib/mod.ts'

export class Filter {

    fromBlock:bigint
    toBlock:bigint
    kvEntry:Deno.KvEntryMaybe<KvFilter>

    constructor({
        filter, kvEntry
    }:{ 
        filter?:{ fromBlock:bigint, toBlock:bigint }
        kvEntry:Deno.KvEntryMaybe<KvFilter>   
    }) {

        // set the fromBlock to the filter object's, or 0n if no given filter
        this.fromBlock = filter ? filter.fromBlock : 0n

        // set the fromBlock to the filter object's, or -1n if no given filter
        this.toBlock = filter ? filter.toBlock : -1n

        this.kvEntry = kvEntry

    }

    /**
     * Return the width of the filter
     */
    get width():bigint { return this.toBlock - this.fromBlock + 1n }

    async update(chain:Chain):Promise<boolean|null> {

        const atom = kv.atomic()

        const commit = atom
            .check(this.kvEntry)
            .set(['filters', chain.chainId, machineId], this)
            .commit
        
        // attempt the commit

        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')

        await Logger.detail(`Filter: sending chain ${chain.chainId} update request`)

        const result = await Logger.wrap(
            rlb.regulate({ fn: commit.bind(atom), args: [] }),
            `Filter: chain ${chain.chainId} update request failure`,
            LogLevel.DETAIL,
            `Filter: chain ${chain.chainId} update request success`
        )

        // return null if above request fails
        if (result === null) return null
        
        // return whether or not the commit succeeded
        return result.ok

    }

    async clip(chain:Chain):Promise<void> {

        // get the chain's url
        const url = await chain.url()

        // return if the above fails or is not set
        if (!url) return

        // get the max width for this url
        const max = await kvGet<bigint>(['filterMaxWidth', url])

        // return if the above fails or is not set
        if (!max) return

        // clip width to max if applicable
        if (this.width > max) this.toBlock = this.fromBlock + max - 1n

    }

    bisect():void {

        // halve the width of the filter while keeping fromBlock the same
        this.toBlock = this.fromBlock + (this.toBlock - this.fromBlock) / 2n

    }

    bump():void {

        // move the filter forward
        // doing this will force the scanner to get the current height
        this.fromBlock = this.toBlock + 1n

    }

}