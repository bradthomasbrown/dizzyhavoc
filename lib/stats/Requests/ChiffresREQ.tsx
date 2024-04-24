export async function ChiffresREQ() {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
      const response = await fetch("https://cursed-bear.deno.dev/v1/chiffres", options)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  