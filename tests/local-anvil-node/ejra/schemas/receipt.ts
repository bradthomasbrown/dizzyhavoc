import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { log, quantity } from "./mod.ts";

export const receipt = z.object({
  transactionHash: z.string(),
  transactionIndex: quantity,
  blockHash: z.string(),
  blockNumber: quantity,
  from: z.string(),
  to: z.string().nullable(),
  cumulativeGasUsed: quantity,
  effectiveGasPrice: quantity,
  gasUsed: quantity,
  contractAddress: z.string().nullable(),
  logs: log.array(),
  logsBloom: z.string(),
  type: z.literal("0x0").or(z.literal("0x1")).or(z.literal("0x2")),
  status: z.literal("0x0").or(z.literal("0x1")),
}).nullable();