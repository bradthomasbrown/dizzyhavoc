const url = 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan'

const details = {
    guid: 'c7462f75-7250-5c2f-844f-716d7bb0f5e0',
    module: 'contract',
    action: 'checkverifystatus',
    apikey: 'snowtrace'
} as const
const body = Object.entries(details)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
const init = { body, headers, method: 'POST' } as const
// const response = await fetch(url, init)
// const text = await response.text()

// console.log(text)
console.log(body)
while (true) {
    const response = await fetch(url, init)
    const text = await response.text()
    console.log(text)
    await new Promise(r => setTimeout(r, 5000))
}