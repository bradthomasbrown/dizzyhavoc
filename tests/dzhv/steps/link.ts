import { Signer, Node, selector } from 'https://cdn.jsdelivr.net/gh/bradbrown-llc/w4@0.0.6/lib/mod.ts';

export async function link({
    session:{ node, signers: { implementer } },
    resolver, erc20,
    nonce
}:{
    session:{ node:Node, signers: { implementer:Signer } },
    resolver:{ address:string }, erc20:{ address: string }
    nonce:bigint
}) {

    // get code
    const input = `${selector('setImplementations((address,uint32[])[])')}${                                             // Resolver.setImplementations(Config[] calldata configs)
        '0000000000000000000000000000000000000000000000000000000000000020'  // configs offset
     }${'0000000000000000000000000000000000000000000000000000000000000001'  // configs length
     }${'0000000000000000000000000000000000000000000000000000000000000020'  // config0 offset
     }${'000000000000000000000000?C??????????????????????????????????????'  // config0.server
     }${'0000000000000000000000000000000000000000000000000000000000000040'  // config0.selectors offset
     }${'000000000000000000000000000000000000000000000000000000000000000c'  // config0.selectors length
     }${selector('name()').slice(2).padStart(64, '0')                                // name
     }${selector('symbol()').slice(2).padStart(64, '0')                              // symbol
     }${selector('decimals()').slice(2).padStart(64, '0')                            // decimals
     }${selector('balanceOf(address)').slice(2).padStart(64, '0')                    // balanceOf
     }${selector('allowance(address,address)').slice(2).padStart(64, '0')            // allowance
     }${selector('totalSupply()').slice(2).padStart(64, '0')                         // totalSupply
     }${selector('burn(uint256,address,uint256,uint64)').slice(2).padStart(64, '0')  // burn
     }${selector('mint((address,uint256)[])').slice(2).padStart(64, '0')             // multimint
     }${selector('mint(address,uint256)').slice(2).padStart(64, '0')                // singlemint
     }${selector('transfer(address,uint256)').slice(2).padStart(64, '0')             // transfer
     }${selector('transferFrom(address,address,uint256)').slice(2).padStart(64, '0') // transferFrom
     }${selector('approve(address,uint256)').slice(2).padStart(64, '0')}`            // approve
     .replace(/\?C\?+/g, erc20.address.slice(2))

    const f = Deno.makeTempFileSync()
    Deno.writeTextFileSync(f, JSON.stringify(await node.traceCall({ input, from: implementer.address, to: resolver.address }, 'latest'), undefined, 4))
    console.log(f)

    // get gasLimit
    const gasLimit = await node.estimateGas({ input, from: implementer.address, to: resolver.address }, 'latest')
    
    // sign tx
    const signedTx = implementer.signTx({ nonce, gasLimit, data: input, gasPrice: await node.gasPrice(), chainId: await node.chainId(), to: resolver.address })

    // deploy
    const hash = await node.sendRawTx(signedTx)

    // return contract and deployment info
    return { hash }

}