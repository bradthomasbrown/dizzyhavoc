export let cachedData: any[] = [];
export function cache(type: string, data: any[]) {
    cachedData[type] = data;
}