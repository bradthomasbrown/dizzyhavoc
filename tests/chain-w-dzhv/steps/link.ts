import { Signer, signRawTx, getC2Addr } from '../../../lib/mod.ts'
import * as ejra from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/ejra@0.5.3/lib/mod.ts'
import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts';

const contractsDir = fromFileUrl(import.meta.resolve('../../../contracts'))

export async function link({
    session, nonce, resolver, erc20
}:{
    session:{ signers:Record<string,Signer>, url:string, gasPrice:bigint, chainId:number }
    nonce:bigint, erc20:{ address:string }, resolver:{ address:string }
}) {

    // extract info from session
    const { signers:{ deployer, implementer }, url } = session

    // get code
    const input = `${'0x3608adf5'}${                                             // Resolver.setImplementations(Config[] calldata configs)
        '0000000000000000000000000000000000000000000000000000000000000020'   // configs offset
     }${'0000000000000000000000000000000000000000000000000000000000000001'   // configs length
     }${'0000000000000000000000000000000000000000000000000000000000000020'   // config0 offset
     }${'000000000000000000000000?C??????????????????????????????????????'   // config0.server
     }${'0000000000000000000000000000000000000000000000000000000000000040'   // config0.selectors offset
     }${'000000000000000000000000000000000000000000000000000000000000000a'   // config0.selectors length
     }${'00000000000000000000000000000000000000000000000000000000dd62ed3e'   // allowance
     }${'00000000000000000000000000000000000000000000000000000000095ea7b3'   // approve
     }${'0000000000000000000000000000000000000000000000000000000070a08231'   // balanceOf
     }${'00000000000000000000000000000000000000000000000000000000313ce567'   // decimals
     }${'000000000000000000000000000000000000000000000000000000007e0b4201'   // multimint
     }${'0000000000000000000000000000000000000000000000000000000006fdde03'   // name
     }${'0000000000000000000000000000000000000000000000000000000095d89b41'   // symbol
     }${'0000000000000000000000000000000000000000000000000000000018160ddd'   // totalSupply
     }${'00000000000000000000000000000000000000000000000000000000a9059cbb'   // transfer
     }${'0000000000000000000000000000000000000000000000000000000023b872dd'}` // transferFrom
     .replace(/\?C\?+/g, erc20.address.slice(2))

    // get gasLimit
    const txCallObject = { input, from: implementer.address, to: resolver.address }
    const gasLimit = await ejra.methods.estimateGas(url, txCallObject, 0n)
    
    // sign tx
    const tx = { signer: implementer, nonce, gasLimit, data: input, ...session }
    const { signedTx, hash } = signRawTx(tx)

    // deploy
    ejra.methods.sendRawTx(url, signedTx)

    // return contract and deployment info
    return { hash }

}