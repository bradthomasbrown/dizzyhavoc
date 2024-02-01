import { Signer } from '../../lib/mod.ts'
import * as e from '../../ejra/mod.ts'

const deployer = new Signer({ secret: Deno.env.get('DZHV_DEPLOYER_SECRET') as string })
const implementer = new Signer({ secret: Deno.env.get('DZHV_IMPLEMENTER_SECRET') as string })
const destroyer = new Signer({ secret: Deno.env.get('DZHV_DESTROYER_SECRET') as string })
const wallet = new Signer({ secret: Deno.env.get('DZHV_WALLET_SECRET') as string })
const signers = { deployer, implementer, destroyer, wallet }

const url = 'https://endpoints.omniatech.io/v1/bsc/mainnet/public'

const ejrrqs = Object.values(signers).map(s => e.nonce({ address: s.address }).ejrrq)
const nonces = await e.ejrb({ url, ejrrqs })

console.log(Object.fromEntries(Object.keys(signers).map((sn, i) => [sn, nonces[i]])))