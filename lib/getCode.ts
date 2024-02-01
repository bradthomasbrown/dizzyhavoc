import { fromFileUrl } from 'https://deno.land/std@0.213.0/path/from_file_url.ts'
export default function (name:string) {
    const url = import.meta.resolve(`../contracts/${name}`)
    const path = fromFileUrl(url)
    return Deno.readTextFileSync(path).split('\n').at(-1)
}