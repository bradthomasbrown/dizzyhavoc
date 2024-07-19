export async function Dex() { // dexscreener's token data
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
    );
    const data = await response.json();
    const pairs = data.pairs
    const timestamp = Date.now()
    return {pairs, timestamp};
  } catch (error) {
    console.error(error);
  }
}
