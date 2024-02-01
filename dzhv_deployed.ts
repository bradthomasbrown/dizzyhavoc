import * as e from './ejra/mod.ts'

async function getDeployed({ address, url }:{ address:string, url:string }) {
    const interval = 0
    const height = await e.height().call(url)
    let w = [0n, height]
    console.log(w)
    async function fn() {
        const ejrrqs = w.map((_, i) => e.code({ address, tag: w[i] }).ejrrq)
        const c = await e.ejrb({ url, ejrrqs })
        await new Promise(r => setTimeout(r, interval))
        const [cl, cr] = c
        const [wl, wr] = w
        if (cl == '0x' && cr != '0x') w = [wr - (wr - wl) / 2n, wr]
        if (cl != '0x' && cr != '0x') w = [wl - (wr - wl), wl]
        console.log(w)
        if (wr - wl == 0n) return w[0]
        return () => fn()
    }
    let thunk = await fn()
    while (typeof thunk == 'function') thunk = await thunk()
    return thunk
}

// const url = 'https://arbitrum.blockpi.network/v1/rpc/public'
const url = 'https://api.avax.network/ext/bc/C/rpc'
const address = '0x3e6A2314eDB0599b2D4Bc23812EDEb993c1916E6'
console.log(await getDeployed({ url, address }))
