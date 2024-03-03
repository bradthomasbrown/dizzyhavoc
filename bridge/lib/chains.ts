import { fromFileUrl } from 'https://deno.land/std@0.214.0/path/posix/from_file_url.ts'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const chainsDir = fromFileUrl(import.meta.resolve('../../chains/_data/chains'))

const schemas:Record<string,z.ZodTypeAny> = {}
schemas.chain = z.object({
    name: z.string(),
    chain: z.string(),
    rpc: z.string().array(),
    chainId: z.number().transform(BigInt)
})

const chains = new Set<Chain>()
for await (const { name } of Deno.readDir(chainsDir)) {
    const chain = schemas.chain.parse(JSON.parse(Deno.readTextFileSync(`${chainsDir}/${name}`)))
    chains.add(chain)
}

export default chains