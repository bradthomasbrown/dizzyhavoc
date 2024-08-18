export function econConf(
  { url, signal, chainId, id }: {
    url: string;
    signal: AbortSignal;
    chainId: number;
    id?: string | number;
  },
) {
  return fetch(url, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "get_econConf",
      params: { chainId },
      id: id ?? 0,
    }),
  });
}
