import chains from './chains.ts'

const dzhv:Record<string,Chain> = {}

for (const chain of chains) {
    if (chain.name.match(/ava/i)) console.log(chain)
    if (chain.chainId == 43114n) dzhv.
    // if (chain.chainId == 43114n) console.log(chain)
    // if (chain.chain.match(/^bsc$/i)) console.log(chain)
    // if (chain.chainId == 1n) dzhv.eth = chain
}