export async function PriceHistory() {
  try {
    const response = await fetch(
      "https://funky-fox.deno.dev/v1/tokens",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
