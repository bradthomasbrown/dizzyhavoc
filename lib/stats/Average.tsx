export async function Average_Weekly() {
    try {
      const response = await fetch(
        "https://swift-panther.deno.dev/v1/weekly/price",
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  