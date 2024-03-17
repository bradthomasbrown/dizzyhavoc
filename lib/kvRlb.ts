// export RLBs
import { RLB } from 'https://deno.land/x/rlb@0.0.9/RLB.ts'
import { Cache } from '../classes/Cache.ts'
const kvRlb = new RLB()
kvRlb.delay = await Cache.get('kvRlbDelay')
kvRlb.lim = await Cache.get('kvRlbLim')
export { kvRlb }