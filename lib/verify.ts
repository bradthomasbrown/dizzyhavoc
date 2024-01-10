type Opts = {
    url:string
    apikey:string
    sourceCode:string
    contractname:string
    compilerversion:string
    contractaddress:string
    evmversion:string
}

export default function ({
    url,
    apikey,
    sourceCode,
    contractname,
    compilerversion,
    contractaddress,
    evmversion
}:Opts) {
    const details = {
        apikey,//: 'snowtrace',
        module: 'contract',
        action: 'verifysourcecode',
        codeformat: 'solidity-single-file',
        sourceCode,//: Deno.readTextFileSync('./contracts/SetServers/SetServers.sol'),
        contractname,//: 'SetServers',
        compilerversion,//: 'v0.8.23+commit.f704f362',
        constructorArguements: '',
        contractaddress,//: '0x4C42f58f7F8629907FE5B14facF87c1D83307bC6',
        evmversion,//: 'paris'
    } as const
    const body = Object.entries(details)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join('&')
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    const init = { body, headers, method: 'POST' } as const
    return fetch(url, init)
}