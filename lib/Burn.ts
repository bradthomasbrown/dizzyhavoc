import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { AIQ } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/aiq@0.0.0/mod.ts'
import { Ejra } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.4.2-vertigo/mod.ts'
import { Receipt, Log } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.4.2-vertigo/types/mod.ts'
import { KvVertigo } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/kvvertigo@0.0.2/mod.ts'
import { KvBurn } from './KvBurn.ts'
import { Chain } from './Chain.ts'
import { KvChain } from './KvChain.ts'
import { Mint } from './Mint.ts'

type BurnState = 'archive'|'finalizable'|'finalized'|null
type StageName = 'scanner'|'finalizerB'|'minter'|'finalizerM'
type MintState = 'archive'|'sendable'|'finalizable'|'finalized'|null

export class Burn {

    chain:Chain
    log:Log
    hash:string
    destination:bigint
    err?:AIQ<Error>
    out?:AIQ<string>

    constructor(chain:Chain, log:Log, { err, out }:{ err?:AIQ<Error>, out?:AIQ<string> }={}) {
        this.chain = chain
        this.log = log
        this.hash = log.transactionHash
        this.destination = z.string().transform(BigInt).parse(`0x${log.data.slice(2, 2 + 64)}`)
        this.err = err
        this.out = out
    }

    static fromEvent(chain:Chain, log:Log, { err, out }:{ err?:AIQ<Error>, out?:AIQ<string> }={}):Burn {
        return new Burn(chain, log, { err, out })
    }

    async claim(processId:string):Promise<Error|boolean> {
        const result = await this.chain.kvv.atomic()
            .check({ key: ['processing', this.hash], versionstamp: null })
            .set(['processing', this.hash], true)
            .set(['processing', processId, this.hash], this.toJSON())
            .commit()
        return result instanceof Error ? result : result.ok
    }

    async unclaim(processId:string):Promise<Error|boolean> {
        const result = await this.chain.kvv.atomic()
            .delete(['processing', this.hash])
            .delete(['processing', processId, this.hash])
            .commit()
        return result instanceof Error ? result : result.ok
    }

    async state():Promise<Error|BurnState> {
        const result = await this.chain.kvv.getMany<[KvBurn, KvBurn, KvBurn]>([
            ['archive', 'burn', this.chain.chainId, this.hash],
            ['finalizable', 'burn', this.chain.chainId, this.hash],
            ['finalized', 'burn', this.chain.chainId, this.hash]
        ])
        if (result instanceof Error) return result
        if (result.reduce((p, c) => p + (c.versionstamp !== null ? 1 : 0), 0) > 1) return new Error(`Burn.state: multiple mint states detected`)
        const [archive, finalizable, finalized] = result
        if (archive.versionstamp !== null) return 'archive'
        if (finalizable.versionstamp !== null) return 'finalizable'
        if (finalized.versionstamp !== null) return 'finalized'
        return null
    }

    async move(state:BurnState): Promise<Error|boolean> {
        const atom = this.chain.kvv.atomic()
        const keys:Record<Exclude<BurnState,null>,Deno.KvKey> = {
            archive: ['archive', 'burn', this.chain.chainId, this.hash],
            finalizable: ['finalizable', 'burn', this.chain.chainId, this.hash],
            finalized: ['finalized', 'burn', this.chain.chainId, this.hash]
        }
        for (const key of Object.values(keys)) atom.delete(key)
        const kvBurn = this.toJSON()
        if (state !== null) atom.set(keys[state], kvBurn)
        let message = `Burn.move: to ${state} hashslice ${this.hash.slice(-8)}`
        if (state === 'finalized') {
            const mint = await Mint.fromBurn(this)
            if (mint instanceof Error) return mint
            const state = await mint.state()
            if (state instanceof Error) return state
            if (state !== null) return new Error(`Burn.move(\'finalized\'): cannot create mint with existing state ${state}`)
            const kvMint = mint.toJSON()
            atom.set(['sendable', 'mint', mint.chain.chainId, mint.burn.hash], kvMint)
            message += ` & mint created in sendable`
        }
        const result = await atom.commit()
        if (result instanceof Error) return result
        if (result.ok === true && this.out) this.out.push(message)
        return result.ok 
    }

    static async next(state:Exclude<BurnState,null>, kvv:KvVertigo, ejra:Ejra, { err, out }:{ err?:AIQ<Error>, out?:AIQ<string> }={}):Promise<null|Burn> {
        const selector:Deno.KvListSelector = { prefix: [state, 'burn'] }
        for await (const burnEntry of kvv.list<KvBurn>(selector)) {
            if (burnEntry instanceof Error) continue
            const processing = await kvv.get<true>(['processing', burnEntry.value.hash])
            if (!(processing instanceof Error) && processing.value === true) continue
            const chainId = burnEntry.value.source
            const chainEntry = await kvv.get<KvChain>(['chains', chainId])
            if (chainEntry instanceof Error) continue
            let chain:Chain
            if (chainEntry.value === null) {
                const fakeEntry:Deno.KvEntry<KvChain> = {
                    ...chainEntry,
                    value: { lastUpdated: 0 },
                    versionstamp: 'fake'
                }
                chain = new Chain(fakeEntry, kvv, ejra)
            } else chain = new Chain(chainEntry, kvv, ejra)
            return new Burn(chain, burnEntry.value.log, { err, out }) 
        }
        return null
    }

    async finalize():Promise<Error|boolean> {
        const startHeight = await this.height()
        if (startHeight instanceof Error) return startHeight
        while (true) {
            const confirmations = await this.confirmations()
            if (confirmations instanceof Error) return confirmations
            const receipt = await this.receipt()
            if (receipt instanceof Error) return receipt
            const height = await this.height()
            if (height instanceof Error) return height
            if (receipt === null) { if (height - startHeight >= confirmations) return false }
            else if (height - receipt.blockNumber >= confirmations) return true
        }
    }

    confirmations():Promise<Error|bigint> { return this.chain.confirmations() }

    receipt():Promise<Error|Receipt> { return this.chain.receipt(this.hash) }

    height():Promise<Error|bigint> { return this.chain.height() }

    async purge():Promise<Error|boolean> {
        const atom = this.chain.kvv.atomic()
        const keys:Record<Exclude<BurnState,null>,Deno.KvKey> = {
            archive: ['archive', 'burn', this.chain.chainId, this.hash],
            finalizable: ['finalizable', 'burn', this.chain.chainId, this.hash],
            finalized: ['finalized', 'burn', this.chain.chainId, this.hash]
        }
        for (const key of Object.values(keys)) atom.delete(key)
        const result = await atom.commit()
        return result instanceof Error ? result : result.ok 
    }

    toJSON():KvBurn {
        return {
            source: this.chain.chainId,
            log: this.log,
            hash: this.hash,
            destination: this.destination
        }
    }

    destinationActive():Promise<Error|boolean> {
        return Chain.active(this.chain.kvv, this.destination)
    }

    static async nextProcessing(processId:string, kvv:KvVertigo, ejra:Ejra, { err, out }:{ err?:AIQ<Error>, out?:AIQ<string> }={}):Promise<null|Burn> {
        const selector:Deno.KvListSelector = { prefix: ['processing', processId] }
        for await (const burnEntry of kvv.list<KvBurn>(selector)) {
            if (burnEntry instanceof Error) continue
            const chainId = burnEntry.value.source
            const chainEntry = await kvv.get<KvChain>(['chains', chainId])
            if (chainEntry instanceof Error) continue
            let chain:Chain
            if (chainEntry.value === null) {
                const fakeEntry:Deno.KvEntry<KvChain> = {
                    ...chainEntry,
                    value: { lastUpdated: 0 },
                    versionstamp: 'fake'
                }
                chain = new Chain(fakeEntry, kvv, ejra)
            } else chain = new Chain(chainEntry, kvv, ejra)
            return new Burn(chain, burnEntry.value.log, { err, out })
        }
        return null
    }

}