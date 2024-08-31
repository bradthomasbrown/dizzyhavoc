import { cache, cachedData } from "$fresh_charts/stats/Requests/caches/chartCache.tsx";
export async function PriceHistory() {
  if (cachedData[0] == undefined) {
  try {
    const response = await fetch(
      "https://funky-fox.deno.dev/v1/tokens",
    );
    const data = await response.json();
    cache(data);
    return data;
  } catch (error) {
    console.error(error);
  }
  }
}
