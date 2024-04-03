import { KvBurn } from "../../vertigo/lib/KvBurn.ts";

export type KvMint = {
  hash?: string;
  prevHash?: string;
  nonce?: bigint;
  chainId: number;
  burn: KvBurn;
  attempts?: number
};
