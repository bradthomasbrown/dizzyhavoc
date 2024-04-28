export async function Chiffres() {
  try {
    const response = await fetch(
      "https://cursed-bear.deno.dev/v1/chiffres"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
