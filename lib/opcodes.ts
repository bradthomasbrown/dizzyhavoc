export default {
    STOP: { opcode: 0x00, input: [], output: [] },
    ADD: { opcode: 0x01, input: ['a', 'b'], output: ['a + b'] },
    PUSH1: { opcode: 0x60, input: [], output: ['value'] }
} as const