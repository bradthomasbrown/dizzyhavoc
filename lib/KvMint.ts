import { KvBurn } from "../../vertigo/lib/KvBurn.ts";

export type KvMint = {
  hash?: string;
  prevHash?: string;
  nonce?: bigint;
  chainId: bigint;
  burn: KvBurn;
};
