import { KvFilter } from "./KvFilter.ts";
import { Chain } from "./Chain.ts";

export class Filter {
  fromBlock: bigint;
  toBlock: bigint;
  entry: Deno.KvEntryMaybe<KvFilter>;
  chain: Chain;
  address: string;
  topics: (string | string[])[];

  constructor(
    entry: Deno.KvEntryMaybe<KvFilter>,
    chain: Chain,
    address: string,
    topics: (string | string[])[],
  ) {
    this.fromBlock = entry.value?.fromBlock ?? 0n;
    this.toBlock = entry.value?.toBlock ?? -1n;
    this.entry = entry;
    this.chain = chain;
    this.address = address;
    this.topics = topics;
  }

  get width(): bigint {
    return this.toBlock - this.fromBlock + 1n;
  }

  async clip(): Promise<void> {
    if (this.toBlock <= this.fromBlock) return;
    const url = await this.chain.url();
    if (url instanceof Error) return;
    const entry = await this.chain.kvv.get<bigint>(["filterMaxWidth", url]);
    if (entry instanceof Error) return;
    if (entry.value === null) return;
    const max = entry.value;
    if (this.width > max) this.toBlock = this.fromBlock + max - 1n;
  }

  bisect() {
    this.toBlock = this.fromBlock + (this.toBlock - this.fromBlock) / 2n;
  }

  bump() {
    this.fromBlock = this.toBlock + 1n;
  }

  async update(processId: string): Promise<Error | boolean> {
    const kvFilter: KvFilter = {
      fromBlock: this.fromBlock,
      toBlock: this.toBlock,
    };
    const result = await this.chain.kvv.atomic()
      .check(this.entry)
      .set([
        "filters",
        this.chain.chainId,
        this.address,
        this.topics.sort((a, b) => a < b ? -1 : a == b ? 0 : 1).join(),
        processId,
      ], kvFilter)
      .commit();
    return result instanceof Error ? result : result.ok;
  }

  toJSON(): {
    fromBlock: bigint;
    toBlock: bigint;
    address: string;
    topics: (string | string[])[];
  } {
    return {
      fromBlock: this.fromBlock,
      toBlock: this.toBlock,
      address: this.address,
      topics: this.topics,
    };
  }
}
