import { encode } from 'npm:@ethereumjs/rlp@5.0.1'
import { etc } from 'npm:@noble/secp256k1@2.0.0'
import jsSha3 from 'npm:js-sha3@0.9.2'
const { keccak256 } = jsSha3
const { bytesToHex } = etc
import Signer from './Signer.ts'

export default function ({
    signer, nonce, gasPrice, gasLimit, to, value, data, chainId
}:{
    signer:Signer, nonce:bigint, gasPrice:bigint, gasLimit:bigint, to?:string, value?:bigint, data?:string, chainId:bigint
}) {
    const rawTxArray = [nonce, gasPrice, gasLimit, to, value, data, chainId, 0, 0]
    const rawTxEncoding = encode(rawTxArray)
    const rawTxHash = keccak256(rawTxEncoding)
    const { r, s, recovery } = signer.sign(rawTxHash)
    if (recovery === undefined) throw new Error('undefined recovery bit')
    const v = chainId * 2n + 35n + BigInt(recovery)
    const signedTxArray = [...rawTxArray.slice(0, 6), v, r, s]
    const signedTxBytes = encode(signedTxArray)
    const signedTx = `0x${bytesToHex(signedTxBytes)}`
    const hash = `0x${keccak256(signedTxBytes)}`
    return { signedTx, hash }
}