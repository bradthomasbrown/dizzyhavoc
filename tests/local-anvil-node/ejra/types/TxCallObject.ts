import { Tag } from "./mod.ts";

export type TxCallObject = {
  from?: string;
  to: string;
  gas?: bigint;
  gasPrice?: bigint;
  value?: bigint;
  input?: string;
  tag?: Tag;
};