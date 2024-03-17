const tokenAddress = Deno.env.get('BRIDGE_TOKEN_ADDRESS') as string
if (!tokenAddress) throw new Error(`required env var 'BRIDGE_TOKEN_ADDRESS' not set`)
export { tokenAddress }