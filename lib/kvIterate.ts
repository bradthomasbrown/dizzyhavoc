

export function kvIterate<T>(prefix:Deno.KvKey)
:AsyncIterableIterator<Deno.KvEntry<T>> {

    const counter = { value: 0 }

    const list = kv.list<T>({ prefix })

    async function next():Promise<IteratorResult<Deno.KvEntry<T>>> {
        
        rlb.delay = await Cache.get('kvRlbDelay')
        rlb.lim = await Cache.get('kvRlbLim')

        await Logger.detail(`kvIterate: prefix [${prefix}] start`)

        const result = await Logger.wrap(
            rlb.regulate({ fn: list.next.bind(list), args: [] }),
            `kvIterate: prefix [${prefix}] iteration ${counter.value} failure`,
            LogLevel.DETAIL,
            `kvIterate: prefix [${prefix}] iteration ${counter.value} success`
        )

        if (result?.done)
            await Logger.detail(
                `kvIterate: prefix [${prefix}] done, count ${counter.value}`
            )

        if (!result || result.done) return { done: true, value: null }

        counter.value++

        return { value: result.value }

    }

    const asyncIterableIterator:AsyncIterableIterator<Deno.KvEntry<T>> = {
        next, [Symbol.asyncIterator]() { return asyncIterableIterator }
    }

    return asyncIterableIterator

}