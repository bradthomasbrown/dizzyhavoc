export async function Weekly(category: string) {
  try {
    const response = await fetch(
      "https://swift-panther.deno.dev/v1/weekly/" + category
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
