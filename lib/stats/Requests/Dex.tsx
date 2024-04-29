import { cache } from "./tokencache.tsx";
export async function Dex() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
    );
    const data = await response.json();
    cache(data)
    return data
  } catch (error) {
    console.error(error);
  }
}