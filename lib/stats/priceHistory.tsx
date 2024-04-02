export async function PriceHistory() {
  try {
    const response = await fetch(
      "https://quick-frog-59.deno.dev/v1/liveprices",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
