import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts'
import { Ejra } from "./ejra/ejra.ts";

const ejra = new Ejra()
const url = 'http://chain-8000'
const height = await ejra.height(url)
const chainId = await ejra.chainId(url)

Deno.test('height test', () => {
    assertEquals(height, 0n)
})

Deno.test('chainId test', () => {
    assertEquals(chainId, 8000n)
})