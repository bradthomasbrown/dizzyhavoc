const machineId = Deno.env.get('BRIDGE_MACHINE_ID') as string
if (!machineId) throw new Error(`required env var 'BRIDGE_MACHINE_ID' not set`)
export { machineId }