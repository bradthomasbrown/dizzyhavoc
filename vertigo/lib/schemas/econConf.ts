import z from "https://deno.land/x/zod@v3.22.4/index.ts";

export const econConf = z.object({
  gasLimitMultiplier: z.tuple([
    z.string().transform(BigInt).or(z.bigint()),
    z.string().transform(BigInt).or(z.bigint())
  ]),
  gasPriceMultiplier: z.tuple([
    z.string().transform(BigInt).or(z.bigint()),
    z.string().transform(BigInt).or(z.bigint())
  ]),
  baseFee: z.string().transform(BigInt).or(z.bigint()),
});
