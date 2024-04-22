export async function Liquidity_Weekly() {
    try {
      const response = await fetch(
        "https://swift-panther.deno.dev/v1/weekly/liquidity",
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  