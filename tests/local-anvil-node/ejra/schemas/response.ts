import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

export const response = z.object({
  jsonrpc: z.literal("2.0"),
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
  id: z.string().or(z.number()),
}).or(z.object({
  jsonrpc: z.literal("2.0"),
  result: z.unknown(),
  id: z.string().or(z.number()),
}));