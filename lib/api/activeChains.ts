export function activeChains(
  { url, signal, id }: {
    url: string;
    signal: AbortSignal;
    id?: string | number;
  },
) {
  return fetch(url, {
    signal,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "get_activeChains",
      params: {},
      id: id ?? 0,
    }),
  });
}
