import artifact from '../lib/artifact.ts'
import { fromFileUrl } from 'https://deno.land/std@0.211.0/path/from_file_url.ts'

const cacheDir = fromFileUrl(import.meta.resolve('../.cache'))
const targetVersion = Deno.args[0]
if (targetVersion === undefined) throw 'undefined version'
const gethDir = `${cacheDir}/geth`
const gethPath = `${gethDir}/${targetVersion}`
const lock = `${gethPath}.lock`
await Deno.mkdir(gethDir, { recursive: true })

async function trigger() { return !await Deno.stat(gethPath).catch(() => 0) }

// using this allows us to get the commit from the version, needed when downloading a geth binary
async function getGethVersions() {
    const args = ['ls-remote', '-t', 'https://github.com/ethereum/go-ethereum']
    const command = new Deno.Command('git', { args })
    const { stdout } = await command.output()
    const text = new TextDecoder().decode(stdout)
    const lines = text.split('\n')
    return lines.map(line => line.split(/.{32}\trefs\/tags\/v?/) as [commit:string, version:string])
}

async function acquire() {
    const versions = await getGethVersions()
    const info = versions.find(([_commit, version]) => version == targetVersion)
    if (!info) throw new Error(`could not find geth version ${targetVersion}`)
    const [commit, version] = info
    const build = `geth-linux-amd64-${version}-${commit}`
    const url = `https://gethstore.blob.core.windows.net/builds/${build}.tar.gz`
    const args = [url, '-qO-']
    const wget = new Deno.Command('wget', { args, stdout: 'piped' }).spawn()
    return { wget, build, version }
}

async function save({ wget, build, version }:{ wget:Deno.ChildProcess, build:string, version:string }) {
    const args = [
        `--transform=s/geth$/${version}/`,  // rename binary from geth to version
        '--strip-components=1',             // strip first archive dir
        '-C', gethDir,                      // output to gethDir
        '-xzf', '-',                        // extract zipped archive from stdin
        `${build}/geth`                     // extract only the binary
    ]
    const tar = new Deno.Command('tar', { args, stdin: 'piped' }).spawn()
    wget.stdout.pipeTo(tar.stdin)
    await tar.output()
}

const carves = [save]

await artifact({ lock, trigger, acquire, carves })