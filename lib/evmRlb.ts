// export RLBs
import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import { Cache } from '../classes/Cache.ts'
const evmRlb = new RLB()
evmRlb.delay = await Cache.get('evmRlbDelay')
evmRlb.lim = await Cache.get('evmRlbLim')
export { evmRlb }