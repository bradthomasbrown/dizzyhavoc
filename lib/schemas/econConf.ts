import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const econConf = z.object({
  gasLimitMultiplier: z.tuple([z.bigint(), z.bigint()]),
  gasPriceMultiplier: z.tuple([z.bigint(), z.bigint()]),
  baseFee: z.bigint()
})