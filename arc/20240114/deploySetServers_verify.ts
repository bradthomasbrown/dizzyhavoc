import Signer from './lib/Signer.ts'

const secret = Deno.args[0]
const signer = new Signer({ secret })
const url = 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan'

console.log(Deno.readTextFileSync('./contracts/SetServers/SetServers.sol')
        .replace('0xC9c423f875677351ab79C058eD1C38F2b36061a4', signer.address))

const details = {
    apikey: 'snowtrace',
    module: 'contract',
    action: 'verifysourcecode',
    codeformat: 'solidity-single-file',
    sourceCode: Deno.readTextFileSync('./contracts/SetServers/SetServers.sol')
        .replace('0xC9c423f875677351ab79C058eD1C38F2b36061a4', signer.address),
    contractname: 'SetServers',
    compilerversion: 'v0.8.23+commit.f704f362',
    contractaddress: '0x18064f18af03608ce6e08e83ddbd4506ef082bb0',
    evmversion: 'paris',
    optimizationUsed: '0'
} as const
const body = Object.entries(details)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
const init = { body, headers, method: 'POST' } as const
const response = await fetch(url, init)
const text = await response.text()

console.log(text)