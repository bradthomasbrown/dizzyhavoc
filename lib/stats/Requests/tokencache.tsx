import { Signal } from "@preact/signals";
export let tokenCache: { [key: string]: Signal } = {};
export function cache(data: any[]) {
  for (let i = 0; i < data.pairs.length; i++) {
    const fixedvalue = Number(data.pairs[i].priceUsd).toFixed(5);
    const fixedliq = Number(data.pairs[i].liquidity.usd).toFixed(5);
    tokenCache["timestamp"] = Date.now();
    switch (data.pairs[i].url) {
      case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
        tokenCache["eth"] = tokenCache["eth"] || {};
        tokenCache["eth"].price = Number(fixedvalue);
        tokenCache["eth"].liq = Number(fixedliq);
        tokenCache["eth"].vol24 = data.pairs[i].volume.h24;
        tokenCache["eth"].tx = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
        tokenCache["eth"].h24 = data.pairs[i].priceChange.h24;
        break;
      case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
        tokenCache["arb"] = tokenCache["arb"] || {};
        tokenCache["arb"].price = Number(fixedvalue);
        tokenCache["arb"].liq = Number(fixedliq);
        tokenCache["arb"].vol24 = data.pairs[i].volume.h24;
        tokenCache["arb"].tx = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
        tokenCache["arb"].h24 = data.pairs[i].priceChange.h24;
        break;
      case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
        tokenCache["bsc"] = tokenCache["bsc"] || {};
        tokenCache["bsc"].price = Number(fixedvalue);
        tokenCache["bsc"].liq = Number(fixedliq);
        tokenCache["bsc"].vol24 = data.pairs[i].volume.h24;
        tokenCache["bsc"].tx = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
        tokenCache["bsc"].h24 = data.pairs[i].priceChange.h24;
        break;
      case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
        tokenCache["base"] = tokenCache["base"] || {};
        tokenCache["base"].price = Number(fixedvalue);
        tokenCache["base"].liq = Number(fixedliq);
        tokenCache["base"].vol24 = data.pairs[i].volume.h24;
        tokenCache["base"].tx = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
        tokenCache["base"].h24 = data.pairs[i].priceChange.h24;
        break;
      case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
        tokenCache["avax"] = tokenCache["avax"] || {};
        tokenCache["avax"].price = Number(fixedvalue);
        tokenCache["avax"].liq = Number(fixedliq);
        tokenCache["avax"].vol24 = data.pairs[i].volume.h24;
        tokenCache["avax"].tx = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
        tokenCache["avax"].h24 = data.pairs[i].priceChange.h24;
        break;
      default:
        break;
    }
  }
}
