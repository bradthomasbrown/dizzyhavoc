const url = 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan'

const params = {
    apikey: 'YourApiKeyToken',
    module: 'contract',
    action: 'checkverifystatus',
    guid: '367fad19-f5be-55f0-b33f-f30e01fcdc38'
}
const body = Object.entries(params).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')
const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
const init = { body, headers, method: 'POST' } as const
console.log(init)
while (true) {
    const response = await fetch(url, init)
    const text = await response.text()
    console.log(text)
    await new Promise(r => setTimeout(r, 5000))
}