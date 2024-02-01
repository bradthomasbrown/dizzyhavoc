const url = 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan'

const params = {
    apikey: 'snowtrace',
    module: 'contract',
    action: 'verifysourcecode',
    sourceCode: Deno.readTextFileSync('./contracts/ERC20/ERC20.sol')
        .replace('0xC9c423f875677351ab79C058eD1C38F2b36061a4', '0x8FaD8827bdCa19F8ae678BB9B76Cb959AEa4BB83'),
    contractaddress: '0xaa53961262aadEEb17EF7c12d519fB3b25c3421F',
    codeformat: 'solidity-single-file',
    contractname: 'ERC20',
    compilerversion: 'v0.8.23+commit.f704f362',
    optimizationUsed: '0',
    evmversion: 'paris'
}
const body = Object.entries(params).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')
const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
const init = { body, headers, method: 'POST' } as const
console.log(init)
const response = await fetch(url, init)
const text = await response.text()

console.log(text)