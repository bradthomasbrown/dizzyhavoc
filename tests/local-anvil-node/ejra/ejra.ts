import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import * as schema from "./schemas/mod.ts";
import { Filter, Tag, TxCallObject } from "./types/mod.ts";

function promiseWithResolvers<T>() {
  let resolve: (value: T) => void = () => {};
  let reject: (reason: unknown) => void = () => {};
  const promise = new Promise<T>((r, j) => {
    resolve = r, reject = j;
  });
  return { promise, resolve, reject };
}

export class Gate<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;

  constructor() {
    const { promise, resolve, reject } = promiseWithResolvers<T>();
    this.promise = promise;
    this.resolve = resolve;
    this.reject = reject;
  }
}

export class Snail<T> {
  lazy: () => Promise<T>;
  born: Promise<void>;
  died: Promise<T>;
  signal?: AbortSignal;

  constructor(
    { lazy, signal }: { lazy: () => Promise<T>; signal?: AbortSignal },
  ) {
    const bornGate = new Gate<void>();
    const diedGate = new Gate<T>();
    this.born = bornGate.promise;
    this.died = diedGate.promise;
    this.lazy = () => {
      bornGate.resolve();
      lazy()
        .then(diedGate.resolve)
        .catch(diedGate.reject);
      return diedGate.promise;
    };
    this.signal = signal;
  }
}

export class Ejra {

  clientVersion(this: Ejra, url: string, ...p: [signal?: AbortSignal]) {
    const request = { method: "web3_clientVersion", schema: schema.string };
    return this.#call(url, { ...request, params: p });
  }

  sha3(this: Ejra, url: string, ...p: [data: string, signal?: AbortSignal]) {
    const request = { method: "web3_sha3", schema: schema.string };
    return this.#call(url, { ...request, params: p });
  }

  chainId(this: Ejra, url: string, ...p: [signal?: AbortSignal]) {
    const request = { method: "eth_chainId", schema: schema.quantity };
    return this.#call(url, { ...request, params: p });
  }

  gasPrice(this: Ejra, url: string, ...p: [signal?: AbortSignal]) {
    const request = { method: "eth_gasPrice", schema: schema.quantity };
    return this.#call(url, { ...request, params: p });
  }

  height(this: Ejra, url: string, ...p: [signal?: AbortSignal]) {
    const request = { method: "eth_blockNumber", schema: schema.quantity };
    return this.#call(url, { ...request, params: p });
  }

  balance(
    this: Ejra,
    url: string,
    ...p: [address: string, tag: Tag, signal?: AbortSignal]
  ) {
    const request = { method: "eth_getBalance", schema: schema.quantity };
    return this.#call(url, { ...request, params: p });
  }

  slot(
    this: Ejra,
    url: string,
    ...p: [address: string, slot: bigint, tag: Tag, signal?: AbortSignal]
  ) {
    const request = { method: "eth_getStorageAt", schema: schema.string };
    return this.#call(url, { ...request, params: p });
  }

  nonce(
    this: Ejra,
    url: string,
    ...p: [address: string, tag: Tag, signal?: AbortSignal]
  ) {
    const request = {
      method: "eth_getTransactionCount",
      schema: schema.quantity,
    };
    return this.#call(url, { ...request, params: p });
  }

  code(
    this: Ejra,
    url: string,
    ...p: [address: string, tag: Tag, signal?: AbortSignal]
  ) {
    const request = { method: "eth_getCode", schema: schema.string };
    return this.#call(url, { ...request, params: p });
  }

  send(this: Ejra, url: string, ...p: [data: string, signal?: AbortSignal]) {
    const request = { method: "eth_sendRawTransaction", schema: schema.string };
    return this.#call(url, { ...request, params: p });
  }

  call(
    this: Ejra,
    url: string,
    ...p: [txCallObject: TxCallObject, tag: Tag, signal?: AbortSignal]
  ) {
    const request = { method: "eth_call", schema: schema.string };
    return this.#call(url, { ...request, params: p });
  }

  estimateGas(
    this: Ejra,
    url: string,
    ...p: [txCallObject: Partial<TxCallObject>, signal?: AbortSignal]
  ) {
    const request = { method: "eth_estimateGas", schema: schema.quantity };
    return this.#call(url, { ...request, params: p });
  }

  receipt(this: Ejra, url: string, ...p: [hash: string, signal?: AbortSignal]) {
    const request = {
      method: "eth_getTransactionReceipt",
      schema: schema.receipt,
    };
    return this.#call(url, { ...request, params: p });
  }

  logs(this: Ejra, url: string, ...p: [filter: Filter, signal?: AbortSignal]) {
    const request = { method: "eth_getLogs", schema: schema.log.array() };
    return this.#call(url, { ...request, params: p });
  }

  #call<
    E extends { method: string; params: P; schema: S },
    P extends unknown[],
    S extends z.ZodTypeAny,
  >(this: Ejra, url: string, request: E) {
    // build init
    const { method, params } = request;
    let signal: undefined | AbortSignal;
    if (params.at(-1) instanceof AbortSignal) {
      signal = params.at(-1) as AbortSignal;
      params.pop();
    }
    const jrrq = { method, params, jsonrpc: "2.0", id: 0 } as const;
    const body = JSON.stringify(
      jrrq,
      (_, v) => typeof v == "bigint" ? `0x${v.toString(16)}` : v,
    );
    const headers = { "Content-Type": "application/json" } as const;
    const init = {
      body,
      headers,
      method: "POST",
      signal,
    } as const satisfies RequestInit;

    const lazy = async (): Promise<z.infer<E["schema"]>> => {
      const response = await fetch(url, init);
      const text = await response.text();
      const json = JSON.parse(text);
      const jraResponse = schema.response.parse(json);
      if ("error" in jraResponse) {
        throw new Error("jraErr", { cause: jraResponse });
      }
      const ejraResponse = request.schema.parse(jraResponse.result);
      return ejraResponse;
    };

    // 🐌
    return lazy()
  }
}