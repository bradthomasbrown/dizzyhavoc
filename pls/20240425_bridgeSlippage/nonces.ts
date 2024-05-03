import { Signer } from '../../lib/mod.ts'
import * as e from '../../ejra/mod.ts'

const deployer = new Signer({ secret: Deno.env.get('DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('WALLET_SECRET') as string })
const signers = { deployer, implementer, destroyer, wallet }

const url = 'https://public.stackup.sh/api/v1/node/bsc-testnet'

const ejrrqs = Object.values(signers).map(s => e.nonce({ address: s.address }).ejrrq)
const nonces = await e.ejrb({ url, ejrrqs })

console.log(Object.fromEntries(Object.keys(signers).map((sn, i) => [sn, nonces[i]])))

const address = '0xc58e022109f6182d39be4c755b96cc2d3fe573b7'
console.log(await e.code({ address, tag: 'latest' }).call(url))