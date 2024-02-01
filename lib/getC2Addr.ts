import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3

export default function ({ salt, create2 }:{ salt:bigint, create2:{ address:string }}) {
    const saltStr = salt.toString(16).padStart(64, '0')
    return `0x${keccak256(hexToBytes(`ff${create2.address.slice(2)}${saltStr}${keccak256(hexToBytes('6020343434335afa3451803b343482933c34f3'))}`)).slice(-40)}`
}