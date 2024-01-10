import Signer from '../lib/Signer.ts'
const secret = Deno.args[0]
const signer = new Signer({ secret })
console.log(signer.address)
console.log(signer.address.toLowerCase())