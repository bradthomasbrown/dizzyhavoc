import * as ejra from "https://deno.land/x/ejra@0.2.1/mod.ts";

export type KvBurn = {
  hash: string;
  source: number;
  destination: number;
  log: ejra.types.Log;
};
