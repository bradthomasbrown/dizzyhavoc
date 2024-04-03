import { AIQ } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/aiq@0.0.0/mod.ts";
import { Ejra } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.4.5-vertigo/mod.ts";
import { Receipt } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.4.5-vertigo/types/mod.ts";
import { KvVertigo } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/kvvertigo@0.0.2/mod.ts";
import { KvMint } from "./KvMint.ts";
import { KvBurn } from "./KvBurn.ts";
import { Chain } from "./Chain.ts";
import { KvChain } from "./KvChain.ts";
import { Burn } from "./Burn.ts";
import { Signer } from "./Signer.ts";
import { signRawTx } from "./signRawTx.ts";

type MintState = "archive" | "sendable" | "finalizable" | "finalized" | null;
type StageName = "scanner" | "finalizerB" | "minter" | "finalizerM";

export class Mint {
  attempts: number;
  chain: Chain;
  burn: KvBurn;
  recipient: string;
  value: bigint;
  nonce?: bigint;
  hash?: string;
  prevHash?: string;
  err?: AIQ<Error>;
  out?: AIQ<string>;

  constructor(
    chain: Chain,
    kvBurn: KvBurn,
    { nonce, hash, prevHash, attempts, out, err }: {
      nonce?: bigint;
      attempts: number
      hash?: string;
      prevHash?: string;
      out?: AIQ<string>;
      err?: AIQ<Error>;
    } = { attempts: 0 },
  ) {
    this.chain = chain;
    this.burn = kvBurn;
    this.recipient = `0x${kvBurn.log.data.slice(2).slice(64 * 1 + 24, 64 * 2)}`;
    this.value = BigInt(`0x${kvBurn.log.data.slice(2).slice(64 * 2, 64 * 3)}`);
    this.nonce = nonce;
    this.hash = hash;
    this.prevHash = prevHash;
    this.out = out;
    this.err = err;
    this.attempts = attempts
  }

  static async fromBurn(burn: Burn): Promise<Error | Mint> {
    const { kvv, ejra } = burn.chain;
    const entry = await kvv.get<KvChain>(["chains", burn.destination]);
    if (entry instanceof Error) return entry;
    if (entry.value === null) {
      return new Error(`Mint.create: chain ${burn.destination} not active`);
    }
    const chain = new Chain(entry, kvv, ejra);
    return new Mint(chain, burn.toJSON(), { attempts: 0, err: burn.err, out: burn.out });
  }

  async claim(processId: string): Promise<Error | boolean> {
    const result = await this.chain.kvv.atomic()
      .check({ key: ["processing", this.burn.hash], versionstamp: null })
      .set(["processing", this.burn.hash], true)
      .set(["processing", processId, this.burn.hash], this.toJSON())
      .commit();
    return result instanceof Error ? result : result.ok;
  }

  async unclaim(processId: string): Promise<Error | boolean> {
    const result = await this.chain.kvv.atomic()
      .delete(["processing", this.burn.hash])
      .delete(["processing", processId, this.burn.hash])
      .commit();
    return result instanceof Error ? result : result.ok;
  }

  async state(): Promise<Error | MintState> {
    const result = await this.chain.kvv.getMany<
      [KvMint, KvMint, KvMint, KvMint]
    >([
      ["archive", "mint", this.chain.chainId, this.burn.hash],
      ["sendable", "mint", this.chain.chainId, this.burn.hash],
      ["finalizable", "mint", this.chain.chainId, this.burn.hash],
      ["finalized", "mint", this.chain.chainId, this.burn.hash],
    ]);
    if (result instanceof Error) return result;
    if (result.reduce((p, c) => p + (c.versionstamp !== null ? 1 : 0), 0) > 1) {
      return new Error(`Mint.state: multiple mint states detected`);
    }
    const [archive, sendable, finalizable, finalized] = result;
    if (archive.versionstamp !== null) return "archive";
    if (sendable.versionstamp !== null) return "sendable";
    if (finalizable.versionstamp !== null) return "finalizable";
    if (finalized.versionstamp !== null) return "finalized";
    return null;
  }

  async move(state: MintState): Promise<Error | boolean> {
    const atom = this.chain.kvv.atomic();
    const keys: Record<Exclude<MintState, null>, Deno.KvKey> = {
      archive: ["archive", "mint", this.chain.chainId, this.burn.hash],
      sendable: ["sendable", "mint", this.chain.chainId, this.burn.hash],
      finalizable: ["finalizable", "mint", this.chain.chainId, this.burn.hash],
      finalized: ["finalized", "mint", this.chain.chainId, this.burn.hash],
    };
    for (const key of Object.values(keys)) atom.delete(key);
    const kvMint = this.toJSON();
    if (state !== null) atom.set(keys[state], kvMint);
    const result = await atom.commit();
    if (result instanceof Error) return result;
    if (result.ok === true && this.out) {
      this.out.push(
        `Mint.move: to ${state} hashslice ${this.burn.hash.slice(-8)}`,
      );
    }
    return result.ok;
  }

  toJSON(): KvMint {
    return {
      chainId: this.chain.chainId,
      burn: this.burn,
      hash: this.hash,
      prevHash: this.prevHash,
      nonce: this.nonce,
      attempts: this.attempts
    };
  }

  static async next(
    state: Exclude<MintState, null>,
    kvv: KvVertigo,
    ejra: Ejra,
    { out, err }: { out?: AIQ<string>; err?: AIQ<Error> } = {},
  ): Promise<null | Mint> {
    const selector: Deno.KvListSelector = { prefix: [state, "mint"] };
    for await (const mintEntry of kvv.list<KvMint>(selector)) {
      if (mintEntry instanceof Error) continue;
      const processing = await kvv.get<true>([
        "processing",
        mintEntry.value.burn.hash,
      ]);
      if (!(processing instanceof Error) && processing.value === true) continue;
      const { chainId } = mintEntry.value;
      const chainEntry = await kvv.get<KvChain>(["chains", chainId]);
      if (chainEntry instanceof Error) continue;
      let chain: Chain;
      if (chainEntry.value === null) {
        const fakeEntry: Deno.KvEntry<KvChain> = {
          ...chainEntry,
          value: { lastUpdated: 0 },
          versionstamp: "fake",
        };
        chain = new Chain(fakeEntry, kvv, ejra);
      } else chain = new Chain(chainEntry, kvv, ejra);
      return new Mint(
        chain,
        mintEntry.value.burn,
        {
          nonce: mintEntry.value.nonce,
          attempts: mintEntry.value.attempts ?? 0,
          hash: mintEntry.value.hash,
          prevHash: mintEntry.value.prevHash,
          out,
          err,
        },
      );
    }
    return null;
  }

  active(): Promise<Error | boolean> {
    return Chain.active(this.chain.kvv, this.chain.chainId);
  }

  async send(signer: Signer, tokenAddress: string) {
    if (this.attempts > 10) {
      await this.move("archive")
      return
    }
    const economyConfiguration = await this.chain.economyConfiguration();
    if (economyConfiguration instanceof Error) return economyConfiguration;
    const { gasLimitMultiplier, gasPriceMultiplier, baseFee } =
      economyConfiguration;
    const { chainId } = this.chain;
    const from = signer.address;
    const to = tokenAddress;
    if (this.value - baseFee <= 0n) {
      await this.move("archive");
      return false;
    }
    const data = `0x40c10f19${this.recipient.slice(2).padStart(64, "0")}${
      (this.value - baseFee).toString(16).padStart(64, "0")
    }`;
    const txCallObject = { from, to, input: data };
    let gasLimit = await this.chain.estimateGas(txCallObject);
    if (gasLimit instanceof Error) return gasLimit;
    gasLimit = gasLimit * gasLimitMultiplier[0] / gasLimitMultiplier[1];
    let gasPrice = await this.chain.gasPrice();
    if (gasPrice instanceof Error) return gasPrice;
    gasPrice = gasPrice * gasPriceMultiplier[0] / gasPriceMultiplier[1];
    const nonce = this.nonce ?? await this.chain.nonce();
    if (nonce instanceof Error) return nonce;
    const { signedTx, hash } = signRawTx({
      signer,
      nonce,
      gasLimit,
      gasPrice,
      chainId,
      data,
      to,
    });
    this.nonce = nonce;
    const oldPrevHash = this.prevHash
    this.prevHash = this.hash;
    this.hash = hash;
    this.attempts++
    const moved = await this.move("finalizable");
    if (moved instanceof Error || moved === false) return moved;
    const result = await this.chain.send(signedTx);
    if (result instanceof Error) {
      // try to set the hashes back if there's an error
      this.hash = this.prevHash
      this.prevHash = oldPrevHash
      await this.move('finalizable')
      return result
    };
    return true;
  }

  async finalize(): Promise<Error | boolean> {
    const startHeight = await this.height();
    if (startHeight instanceof Error) return startHeight;
    while (true) {
      const confirmations = await this.confirmations();
      if (confirmations instanceof Error) return confirmations;
      const receipt = await this.receipt();
      if (receipt instanceof Error) return receipt;
      const height = await this.height();
      if (height instanceof Error) return height;
      if (receipt === null) {
        if (height - startHeight >= confirmations) return false;
      } else if (height - receipt.blockNumber >= confirmations) return true;
    }
  }

  confirmations(): Promise<Error | bigint> {
    return this.chain.confirmations();
  }

  async receipt(): Promise<Error | Receipt> {
    if (this.prevHash) return await this.chain.receipt(this.prevHash);
    if (this.hash) return await this.chain.receipt(this.hash);
    return new Error(
      `Mint.receipt: cannot get receipt, no hash nor prevHash (burnhash: ${this.burn.hash})`,
    );
  }

  height(): Promise<Error | bigint> {
    return this.chain.height();
  }

  async purge(): Promise<Error | boolean> {
    const atom = this.chain.kvv.atomic();
    const keys: Record<Exclude<MintState, null>, Deno.KvKey> = {
      archive: ["archive", "mint", this.chain.chainId, this.burn.hash],
      sendable: ["sendable", "mint", this.chain.chainId, this.burn.hash],
      finalizable: ["finalizable", "mint", this.chain.chainId, this.burn.hash],
      finalized: ["finalized", "mint", this.chain.chainId, this.burn.hash],
    };
    for (const key of Object.values(keys)) atom.delete(key);
    const result = await atom.commit();
    return result instanceof Error ? result : result.ok;
  }

  static async nextProcessing(
    processId: string,
    kvv: KvVertigo,
    ejra: Ejra,
    { err, out }: { err?: AIQ<Error>; out?: AIQ<string> } = {},
  ): Promise<null | Mint> {
    const selector: Deno.KvListSelector = { prefix: ["processing", processId] };
    for await (const mintEntry of kvv.list<KvMint>(selector)) {
      if (mintEntry instanceof Error) continue;
      const { chainId } = mintEntry.value;
      const chainEntry = await kvv.get<KvChain>(["chains", chainId]);
      if (chainEntry instanceof Error) continue;
      let chain: Chain;
      if (chainEntry.value === null) {
        const fakeEntry: Deno.KvEntry<KvChain> = {
          ...chainEntry,
          value: { lastUpdated: 0 },
          versionstamp: "fake",
        };
        chain = new Chain(fakeEntry, kvv, ejra);
      } else chain = new Chain(chainEntry, kvv, ejra);
      return new Mint(chain, mintEntry.value.burn, {
        nonce: mintEntry.value.nonce,
        prevHash: mintEntry.value.prevHash,
        hash: mintEntry.value.hash,
        attempts: mintEntry.value.attempts ?? 0,
        out,
        err,
      });
    }
    return null;
  }
}
