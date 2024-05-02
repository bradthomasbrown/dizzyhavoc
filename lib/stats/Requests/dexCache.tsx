import { Dex } from "$fresh_charts/stats/Requests/Dex.tsx";
export let cachedData: [] = [];
export let state: string = "idle";
export function feca(from:string) {
    if(from=="summary"){
        state = "fetching & caching...";
        let data:[] = [];
        cachedData = data = Dex();
        state = "cached";
        return data
    }
}