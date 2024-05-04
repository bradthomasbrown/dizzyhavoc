import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { quantity } from "./mod.ts";

export const tx = z.object({
  blockHash: z.string().nullable(),
  blockNumber: quantity.nullable(),
  from: z.string(),
  gas: quantity,
  gasPrice: quantity,
  hash: z.string(),
  input: z.string(),
  nonce: quantity,
  to: z.string().nullable(),
  transactionIndex: quantity,
  value: quantity,
  v: quantity,
  r: quantity,
  s: quantity,
});