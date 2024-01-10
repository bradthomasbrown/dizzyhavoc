import { fromFileUrl } from 'https://deno.land/std@0.211.0/path/from_file_url.ts'
import Signer from './Signer.ts'
import getChainId from './getChainId.ts'

type Opts = {
    signer:Signer
    log?:true
}

export default async function ({ signer, log }:Opts) {

    const cacheDir = fromFileUrl(import.meta.resolve('../.cache'))
    const gethDir = `${cacheDir}/geth`
    const gethPath = `${gethDir}/1.13.8`
    const { secret, address } = signer
    
    // create genesis object
    const genesis = JSON.stringify({
        alloc: { [address]: { balance: '1000000000000000000000000000' } }, // prefunds defined account
        config: {
            chainId: await getChainId(), // karalabe can go fuck himself
            clique: { period: 0 }, // required to mine on-demand
            homesteadBlock: 0, // required to use eip150Block
            byzantiumBlock: 0, // REVERT, RETURNDATASIZE, RETURNDATACOPY, STATICCALL opcodes
            istanbulBlock: 0, // required for berlinBlock
            petersburgBlock: 0, // required for istanbulBlock
            constantinopleBlock: 0, // required for petersbergBlock
            berlinBlock: 0, // required for EIP-2718 and EIP-2930 (tx types and access lists, respectively)
            eip150Block: 0, // required to use eip155Block
            eip155Block: 0, // required to use rawTxArray with chainId
            eip158Block: 0, // required for byzantium
        },
        extraData: `0x${''.padEnd(32*2, '0')/*32B vanity*/}${address.slice(2)/*signer*/}${''.padEnd(65*2, '0')/*65B proposer seal*/}`,
        gasLimit: "0x989680", // required
        difficulty: "0x0" // required
    })
    
    // create datadir
    const dataDir = await Deno.makeTempDir()
    
    // write genesis.json
    const genesisPath = `${dataDir}/genesis.json`
    await Deno.writeTextFile(genesisPath, genesis)
    
    // write secret so we can import that secret
    const keyPath = await Deno.makeTempFile()
    await Deno.writeTextFile(keyPath, secret)
    
    const killProcs:Set<Deno.ChildProcess> = new Set()
    Deno.addSignalListener('SIGINT', async () => {
        // kill procs in killProcs and wait for them to exit
        [...killProcs].map(proc => proc.kill())
        // clean up temps
        await Promise.all([
            Deno.remove(keyPath),
            Deno.remove(dataDir, { recursive: true })
        ])
        Deno.exit()
    })
    
    // geth account import
    let args = [
        '--lightkdf',
        '--datadir', dataDir,
        'account', 'import', keyPath
    ]
    const gethAccountImport = new Deno.Command(gethPath, { args, stdin: 'piped', stdout: 'null', stderr: log ? 'inherit' : 'null' }).spawn()
    killProcs.add(gethAccountImport)
    const writer = gethAccountImport.stdin.getWriter()
    writer.write(new Uint8Array([0x0a, 0x0a]))
    await gethAccountImport.output()
    killProcs.delete(gethAccountImport)
    
    // geth init
    args = [
        'init',
        '--datadir', dataDir,
        genesisPath
    ]
    const gethInit = new Deno.Command(gethPath, { args, stderr: log ? 'inherit' : 'null' }).spawn()
    killProcs.add(gethInit)
    await gethInit.output()
    killProcs.delete(gethInit)
    
    // geth
    args = [
        '--datadir', dataDir,
        '--http',
        '--http.addr', '0.0.0.0',
        '--http.api', 'eth,web3,net,debug',
        '--http.corsdomain', '*',
        '--http.vhosts', '*',
        '--nat', 'none',
        '--netrestrict', '127.0.0.1/32',
        '--mine',
        '--miner.etherbase', address,
        '--allow-insecure-unlock',
        '--unlock', address,
        '--password', await Deno.makeTempFile()
    ]
    const geth = new Deno.Command(gethPath, { args, stderr: 'piped' }).spawn()
    killProcs.add(geth)
    
    // utility for future, gives us a promise that resolves with the ejra port of this new node
    const { promise, resolve } = Promise.withResolvers<string>()
    ;(async () => {
        let port:string|undefined
        for await (const bytes of geth.stderr.values({ preventCancel: true })) {
            const text = new TextDecoder().decode(bytes)
            if (log) Deno.stderr.write(bytes)
            port = text.match(/HTTP server started.+?:(\d+) auth=false/)?.[1]
            if (port) break
        }
        resolve(port as string)
    })()
    
    // wait until http server is up
    const port = await promise
    const url = `http://localhost:${port}`
    
    if (log) geth.stderr.pipeTo(Deno.stderr.writable)
    
    return { url, geth }
    
}










