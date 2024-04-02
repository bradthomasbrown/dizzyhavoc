import { hmac } from "npm:@noble/hashes@1.3.3/hmac";
import { sha256 } from "npm:@noble/hashes@1.3.3/sha256";
import { etc, getPublicKey, sign } from "npm:@noble/secp256k1@2.0.0";
import jsSha3 from "npm:js-sha3@0.9.2";
import { encode } from "npm:@ethereumjs/rlp@5.0.1";
import { randomBytes } from "npm:@noble/hashes@1.3.3/utils";
etc.hmacSha256Sync = (k, ...m) => hmac(sha256, k, etc.concatBytes(...m));
const { bytesToHex } = etc;
const { keccak256 } = jsSha3;

type SignTxOpts = {
  chainId: bigint;
  nonce: bigint;
  gasPrice: bigint;
  gasLimit: bigint;
  to?: string;
  value?: bigint;
  data?: string;
  accessList?: [address: string, slots: string[]][];
};

export class Signer {
  secret: string;

  constructor(secret: string) {
    if (!secret) {
      secret = "";
      for (const byte of randomBytes(32)) {
        secret += byte.toString(16).padStart(2, "0");
      }
    }
    this.secret = secret;
  }

  get address() {
    if (!this.secret) throw new Error("missing secret");
    const pub = getPublicKey(this.secret, false).slice(1);
    const rawAddress = keccak256(pub).slice(-40);
    const hash = keccak256(rawAddress);
    let address = "0x";
    for (let i = 0; i < 40; i++) {
      address += rawAddress[i]
        [parseInt(hash[i], 16) >= 8 ? "toUpperCase" : "toLowerCase"]();
    }
    return address;
  }

  sign(msgh: string) {
    return sign(msgh, this.secret);
  }

  signTx({
    chainId,
    nonce,
    gasPrice,
    gasLimit,
    to,
    value,
    data,
    accessList = [],
  }: SignTxOpts) {
    // eip-155 tx (chainId)
    // const rawTxArray = [nonce, gasPrice, gasLimit, to, value, data, chainId, 0, 0]
    // const rawTxEncoding = encode(rawTxArray)
    // const rawTxHash = keccak256(rawTxEncoding)
    // const { r, s, recovery } = this.sign(rawTxHash)
    // if (recovery === undefined) throw new Error('undefined recovery bit')
    // const v = chainId * 2n + 35n + BigInt(recovery)
    // const signedTxArray = [...rawTxArray.slice(0, 6), v, r, s]
    // const signedTx = `0x${bytesToHex(encode(signedTxArray))}`
    // return signedTx

    // eip-2930 tx (accessList)
    const rawTxArray = [
      chainId,
      nonce,
      gasPrice,
      gasLimit,
      to,
      value,
      data,
      accessList,
    ];
    const rawTxHash = keccak256(Uint8Array.from([0x01, ...encode(rawTxArray)]));
    const { r, s, recovery } = this.sign(rawTxHash);
    if (recovery === undefined) throw new Error("undefined recovery bit");
    const signedTxArray = [...rawTxArray, recovery, r, s];
    const txType = 1;
    const txPayload = encode(signedTxArray);
    const tx = Uint8Array.from([txType, ...txPayload]);
    const signedTx = `0x${bytesToHex(tx)}`;
    return signedTx;
  }
}
