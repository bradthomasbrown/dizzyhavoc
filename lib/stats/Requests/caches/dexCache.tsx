import { Dex } from "$fresh_charts/stats/Requests/Dex.tsx";
export let cachedData: [] = [];
export let state: string = "idle";
export function cafe() {
        state = "fetching & caching...";
        let data:[] = [];
        cachedData = data = Dex();
        state = "cached";
        return data
}