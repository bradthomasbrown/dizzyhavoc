import * as e from './ejra/mod.ts'

const audit = '0xff25fe1Ed8C267392a68CC83d05Fa02e1D176d23'.toLowerCase()

const { schema } = e.logs({ filter: {} }).ejrrq
const logs = schema.parse(JSON.parse(Deno.readTextFileSync('dzhv_transfers_avax'), (_, v) => v.match?.(/[0-9]+n/) ? BigInt(v.slice(0, -1)) : v as Log[]))
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

Deno.writeTextFileSync('dzhv_balances_avax', JSON.stringify(balances, (_, v) => typeof v == 'bigint' ? ''+v : v, 4))