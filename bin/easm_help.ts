import opcodes from '../lib/opcodes.ts'

function hex(n:number) { return n.toString(16).padStart(2, '0') }

const watcher = Deno.watchFs('./contracts')
for await (const event of watcher) {
    const { paths, kind } = event
    const path = paths.find(path => path.match(/\.easm$/))
    if (!(kind == 'modify' && path)) continue
    const text = Deno.readTextFileSync(path)
    const rawLines = text.split('\n').map(line => line.replace(/#.*/, ''))
    const fmtLines = []
    let pc = 0
    for (const rawLine of rawLines) {
        const token = rawLine.match(0, 16).trim()
        if (token in opcodes) {
            // token is instruction
            const instruction = token as keyof typeof opcodes
            const { opcode } = opcodes[instruction]
            let fmtLine = instruction.padEnd(16, ' ')
                + `# ${hex(pc)}`.padEnd(8, ' ')
                + `# ${hex(opcode)}`.padEnd(8, ' ')
            pc++
            console.log(fmtLine)
        } else if (token.match(/^:/)) {
            // token is label
            const label = token.replace(/:/, '')
            console.log({ label })
        }
        // if (!(instruction in opcodes)) continue
        // const { opcode } = opcodes[instruction as keyof typeof opcodes]
        
        // console.log({ opcode })
    }
}