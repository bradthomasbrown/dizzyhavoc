type ArtifactOpts<A> = {
    lock:string
    trigger:() => (Promise<boolean>|boolean),
    acquire:() => (Promise<A>|A),
    carves:((a:A) => (Promise<void>|void))[]
}
type Artifact = <A>(o:ArtifactOpts<A>) => Promise<void>
type Foo = () => Promise<Foo|null>
const artifact:Artifact = async (o) => {
    const fn:Foo = async () => {
        return await Deno.mkdir(o.lock)
            .then(() => null)
            .catch(async () => {
                try { 
                    const watcher = Deno.watchFs(o.lock)
                    for await (const _event of watcher) break
                } catch (_) {0}
                return () => fn()
            })
    }
    let thunk = await fn()
    while (typeof thunk == 'function') thunk = await thunk()
    if (await o.trigger()) {
        const a = await o.acquire()
        for (const carve of o.carves)
            carve(a)
    }
    await Deno.remove(o.lock)
}
export default artifact