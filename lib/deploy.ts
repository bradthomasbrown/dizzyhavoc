import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import * as e from '../ejra/mod.ts'
import Signer from './Signer.ts'
import jsSha3 from 'npm:js-sha3@0.9.2'
import { hexToBytes } from 'npm:@noble/hashes@1.3.3/utils'
const { keccak256 } = jsSha3

type Opts = {
    url:string
    signer:Signer,
    bytecode:string,
    chainId:bigint,
    nonce:bigint,
    gasPrice:bigint,
    gasLimit:bigint
}

export default function ({
    signer,
    bytecode,
    chainId,
    nonce,
    gasPrice,
    gasLimit
}:Opts) {
    const accessList:[address:string,slots:string[]][] = []
    const stx = signer.signTx({ chainId, nonce, gasPrice, gasLimit, data: bytecode, accessList })
    const ejrrq = e.sendRawTx({ data: stx })
    const txHash = `0x${keccak256(hexToBytes(stx.slice(2)))}`
    const address = `0x${keccak256(encode([signer.address, nonce])).slice(-40)}`
    return { ejrrq, txHash, address }
}