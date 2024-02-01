import * as e from './ejra/mod.ts'

const audit = '0xfbA2A57A48Dd647511D1dAe8FbC4572560359088'.toLowerCase()

const { schema } = e.logs({ filter: {} }).ejrrq
const logs = schema.parse(JSON.parse(Deno.readTextFileSync('dzhv_transfers_arb'), (_, v) => v.match?.(/[0-9]+n/) ? BigInt(v.slice(0, -1)) : v as Log[]))
const balances:Record<string,bigint> = {}
for (const log of logs) {
    const { data, topics } = log
    const [_, from, to] = topics.map(topic => topic.replace(/0x.{24}/, '0x'))
    const value = BigInt(data)
    if (!from.match(/0x0+$/))
        balances[from] = (balances[from] ?? 0n) - value
    if (!balances[from]) delete balances[from]
    balances[to] = (balances[to] ?? 0n) + value
    if (from == audit || to == audit) console.log(log, balances[audit])
}

Deno.writeTextFileSync('dzhv_balances_arb', JSON.stringify(balances, (_, v) => typeof v == 'bigint' ? ''+v : v, 4))