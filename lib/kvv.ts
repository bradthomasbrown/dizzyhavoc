// import { Fallbacks } from 'https://deno.land/x/kvcache@0.0.0-vertigo/mod.ts'
// import { KvVertigo } from '../../../llc/kv_vertigo/mod.ts'

// const kvPath = Deno.env.get('DENO_KV_PATH')
// if (!kvPath) throw new Error('missing env var \'DENO_KV_PATH\'')
// const kv = await Deno.openKv(kvPath)
// const key = ['delay', 'kv', 'ABC123']
// const fallbacks:Fallbacks<number> = { value: 1000, expireIn: 5000 }
// export const kvv = new KvVertigo(kv, key, fallbacks)

// // export const kv = await Deno.openKv(Deno.env.get('DZHV_KV_PATH'))