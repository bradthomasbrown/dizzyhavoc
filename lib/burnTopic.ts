const burnTopic = Deno.env.get("BRIDGE_BURN_TOPIC") as string;
if (!burnTopic) throw new Error(`required env var 'BRIDGE_BURN_TOPIC' not set`);
export { burnTopic };
