import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import * as ejra from 'https://deno.land/x/ejra@0.2.1/mod.ts'
import { KvBurn, LogLevel } from '../types/mod.ts'
import { Cache, Chain, Logger } from '../classes/mod.ts'
import { kv, kvRlb as rlb } from '../lib/mod.ts'
import { machineId } from '../lib/machineId.ts';

type Event = { log: ejra.types.Log, chain:Chain }
type EventOrKvBurn = Event|KvBurn
type BurnState = 'archive'|'finalizable'|'finalized'

/**
 * Burn class. Has utilities and functions for working with burn events
 * in the context of the bridge
 */
export class Burn {

    id:string
    hash:string
    source:Chain
    destination:Chain
    recipient:string
    value:bigint
    log:ejra.types.Log

    constructor(kvBurn:KvBurn)
    constructor(foo:Event)
    constructor(bar:EventOrKvBurn) {

        if ('chain' in bar) {

            this.hash = bar.log.transactionHash
            this.id = this.hash.slice(-8)
            this.source = bar.chain
            this.log = bar.log

            const [destinationChainId, recipient, value] = z.tuple([
                z.string().transform(s => BigInt('0x'+s)),
                z.string().transform(s => s.substring(24)),
                z.string().transform(s => BigInt('0x'+s))
            ]).parse(bar.log.data.substring(2).match(/.{64}/g))

            this.destination = new Chain({ chainId: destinationChainId })
            this.recipient = recipient
            this.value = value

        } else {

            this.hash = bar.hash
            this.id = this.hash.slice(-8)
            this.source = new Chain({ chainId: bar.source })
            this.destination = new Chain({ chainId: bar.destination })
            this.recipient = bar.recipient
            this.value = bar.value
            this.log = bar.log

        }

    }

    async claim():Promise<boolean|null> {

        // create atom
        const atom = kv.atomic()

        // create claim commit
        const commit = atom
            // make sure KvBurn doesn't exist and isn't being processed
            .check(
                { key: ['processing', machineId, this.hash], versionstamp: null },
                { key: ['archive', 'burn', this.source.chainId, this.hash], versionstamp: null },
                { key: ['finalizable', 'burn', this.source.chainId, this.hash], versionstamp: null },
                { key: ['finalized', 'burn', this.source.chainId, this.hash], versionstamp: null },
            )
            // track this burn
            .set(['processing', machineId, this.hash], true)
            // mark burn as processing
            .set(['processing', this.hash], machineId)
            .commit

        // attempt the commit

        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')
        
        await Logger.detail(`Burn: requesting claim for burn ${this.id}`)

        const result = await Logger.wrap(
            rlb.regulate({ fn: commit.bind(atom), args: [] }),
            `Burn: request to claim burn ${this.id} failure`,
            LogLevel.DETAIL,
            `Burn: request to claim burn ${this.id} returned`
        )

        // return null if above request fails
        if (result === null) return null
        
        // return whether or not the commit succeeded
        return result.ok

    }

    async unclaim():Promise<boolean|null> {

        // create atom
        const atom = kv.atomic()

        // create unclaim commit
        const commit = atom
            // stop tracking this burn
            .delete(['processing', machineId, this.hash])
            // unmark burn as processing
            .delete(['processing', this.hash])
            .commit

        // attempt the commit

        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')
        
        await Logger.detail(`Burn: requesting unclaim for burn ${this.id}`)

        const result = await Logger.wrap(
            rlb.regulate({ fn: commit.bind(atom), args: [] }),
            `Burn: request to unclaim burn ${this.id} failure`,
            LogLevel.DETAIL,
            `Burn: request to unclaim burn ${this.id} returned`
        )

        // return null if above request fails
        if (result === null) return null
        
        // return whether or not the commit succeeded
        return result.ok

    }

    async set(state:BurnState):Promise<boolean|null> {

        // create atom
        const atom = kv.atomic()

        // create commit
        const commit = atom
            // stop tracking this burn
            .delete(['processing', machineId, this.hash])
            // mark as no longer being processed
            .delete(['processing', this.hash])
            // put the burn in the specified state
            .set([state, 'burn', this.source.chainId, this.hash], this)
            .commit

        // attempt the commit

        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')

        await Logger.detail(`Burn: sending request to set burn ${this.id} to ${state}`)

        const result = await Logger.wrap(
            rlb.regulate({ fn: commit.bind(atom), args: [] }),
            `Burn: request to set burn ${this.id} to ${state} did not return`,
            LogLevel.DETAIL,
            `Burn: request to set burn ${this.id} to ${state} returned`
        )

        // return null if above request fails
        if (result === null) return null
        
        // return whether or not the commit succeeded
        return result.ok

    }

    // /**
    //  * Return an AsyncIterator for burns in the specified state
    //  */
    // static iterate(state:BurnState) {

    //     const asyncIterator = {
    //         i: 0,
    //         list: kv.list<Burn>({ prefix: [state] }),
    //         async next():Promise<IteratorResult<Burn>> {
    //             Logger.debug(`Burn: pulling burn from ${state}, iteration ${this.i}`)
    //             const result = await Logger.wrap(
    //                 rlb.regulate({ fn: this.list.next.bind(this.list), args: [] }),
    //                 `Burn: burn state ${state} pull request failed, iteration ${this.i}`,
    //                 LogLevel.DEBUG, `Burn: burn state ${state} pull request successful, iteration ${this.i}`)
    //             if (!result || result.done) return { done: true, value: null }
    //             const kvEntry = result.value
    //             const burn = new Burn(kvEntry.value)
    //             return { value: burn }
    //         },
    //         [Symbol.asyncIterator]() { return asyncIterator }
    //     }

    //     return asyncIterator

    // }

}