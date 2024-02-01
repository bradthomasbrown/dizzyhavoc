import * as e from './ejra/mod.ts'
import Signer from './lib/Signer.ts'

const secret = Deno.args[0]
const signer = new Signer({ secret })

const url = 'https://endpoints.omniatech.io/v1/avax/fuji/public'
const { address } = signer
const bytecode = '0x734C42f58f7F8629907FE5B14facF87c1D83307bC66315a0edce556028602760003760286000f33660006000376000600036600060003560e01c545af43d600060003e6023573d6000fd5b3d6000f3'
const call = { input: bytecode }

const ejrrqs = [
    e.txCount({ address }),
    e.gasPrice(),
    e.estimateGas({ call }),
    e.chainId()
] as const
const [nonce, gasPrice, startGas, chainId] = await e.ejrb({ url, ejrrqs })

const stx = signer.signTx({ nonce, gasPrice, startGas, chainId, data: bytecode })

const ejrrq = e.sendRawTx({ data: stx })
const txHash = await e.ejrc({ url, ejrrq })

console.log(txHash)