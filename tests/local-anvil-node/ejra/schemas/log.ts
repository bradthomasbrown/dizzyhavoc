import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { quantity } from "./mod.ts";

export const log = z.object({
  removed: z.boolean(),
  logIndex: quantity,
  transactionIndex: quantity,
  transactionHash: z.string(),
  blockHash: z.string(),
  blockNumber: quantity,
  address: z.string(),
  data: z.string(),
  topics: z.string().array(),
});