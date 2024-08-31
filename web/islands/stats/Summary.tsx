import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { formatNumber } from "../../lib/common/formatNumber.tsx";
import { cafe } from "../../lib/stats/Requests/caches/dexCache.tsx";
import { SettingsCog } from "../../components/stats/SettingsCog.tsx";
import { fetchmode } from "../../components/stats/SettingsMenu.tsx";
export function Summary() {
  if (!IS_BROWSER) return <></>;
  const initialloading = useSignal<boolean>(true);
  const isloading = useSignal<boolean>(true);
  const count = useSignal<number>(0);
  // global market data
  const delta = useSignal<number>(0);
  const totalsupply = useSignal<number>(0);
  const avrgprice = useSignal<number>(0);
  // prices
  const token_eth = useSignal<number>(0);
  const token_arb = useSignal<number>(0);
  const token_bsc = useSignal<number>(0);
  const token_base = useSignal<number>(0);
  const token_avax = useSignal<number>(0);
  // liq
  const fullliq = useSignal<number>(0);

  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
    token_avax: number
  ) {
    const tokens = {
      Eth: token_eth,
      Arb: token_arb,
      Bsc: token_bsc,
      Base: token_base,
      Avax: token_avax,
    };
    const sortedTokens = Object.entries(tokens).sort((a, b) => a[1] - b[1]); // Sort the tokens by price
    const lowestTokenPrice = sortedTokens[0][1]; // Extract the lowest token price
    const highestTokenPrice = sortedTokens[sortedTokens.length - 1][1]; // Extract the highest token price
    // Calculate the percentage change from the lowest token price to the highest token price
    const maxDeltaPercentage: number =
      ((highestTokenPrice - lowestTokenPrice) / lowestTokenPrice) * 100;
    // Extract the name of the lowest and highest tokens
    delta.value = Number(maxDeltaPercentage.toFixed(0));
  }
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const fetchScreener = async () => {
    isloading.value = true;
    const data = cafe();
    // req to dexscreener for live prices/ liq
    let arbprice = 0,
      ethprice = 0,
      bscprice = 0,
      baseprice = 0,
      avaxprice = 0;
    const result = await data;
    let totalprice = 0;
    let totalliq = 0;
    for (let i = 0; i < result.pairs.length; i++) {
      const fixedvalue = result.pairs[i].priceUsd ? Number(result.pairs[i].priceUsd).toFixed(5) : 0;
      const fixedliq = result.pairs[i].liquidity.usd ? Number(result.pairs[i].liquidity.usd).toFixed(5) : 0;
      switch (result.pairs[i].url) {
        case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
          token_eth.value = ethprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq)
          break;
        case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
          token_arb.value = arbprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq)
          break;
        case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
          token_bsc.value = bscprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq)
          break;
        case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
          token_base.value = baseprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq)
          break;
        case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
          token_avax.value = avaxprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq)
          break;
        default:
          break;
      }
    }
    // assign full liq
    fullliq.value = formatNumber(totalliq);
    // Calculate average price
    const avrg = totalprice / 5;
    const fixedavrg = avrg.toFixed(5);
    avrgprice.value = Number(fixedavrg);
    totalsupply.value = 946778380; // hard coded total supply
    largestPriceDelta(ethprice, arbprice, bscprice, baseprice, avaxprice);
    initialloading.value = false;
    if(fetchmode.value !== "realtime") {
      await delay(1000);
    }
    isloading.value = false;
    starttimer();
  };
  const starttimer = () => {
    let x = 0;
    const mode = fetchmode.value;
    const intervalId = setInterval(() => {
      if (mode != fetchmode.value) {
        clearInterval(intervalId);
        fetchScreener();
      }
      if (x < 100) {
        if (mode === "realtime") {
          x += 10;
        } else if (mode === "faster") {
          x += 0.2;
        } else if (mode === "default") {
          x += 0.1;
        }
        count.value = x;
      } else {
        clearInterval(intervalId);
        fetchScreener();
      }
    }, 10);
  };

  useState(() => {
    // on load fetch data and start timer
    isloading.value = true;
    initialloading.value = true;
    fetchScreener();
  });

  const loadingbar = (
    <div class="bottom-[2px] px-[15px] absolute left-0 items-center justify-center rounded-xl h-[2px] w-full">
      <div
        class="rounded-xl h-[3px] bg-gradient-to-r from-transparent via-[#9b9b9b4f] to-[#9b9b9b] dark:bg-gradient-to-r dark:from-transparent dark:to-[#565656]"
        style={`width: ${count}%`}
      ></div>
    </div>
  );
  return (
    <>
      {initialloading.value ? (
        // no data : display loader
        <div class="sm:w-[465px] w-[350px] bg-blur3 border-[2px] border-[#bababa5c] dark:border-[#3636365e] vignets relative h-full justify-center items-center rounded-lg flex flex-col">
          <img class="size-[30px] ml-[8px] contrast-0 invert-0 dark:invert" src="./svgs/tail-spin.svg"></img>
        </div>
      ) : (
        <>
          <div
            class={`h-full w-[358px] sm:w-[473px] justify-center border-[2px] border-[#bababa5c] dark:border-[#3636365e] relative rounded-lg flex flex-col bg-blur3`}
          >
            <div class="absolute z-[10] top-[2px] right-[2px]">
              <SettingsCog />
            </div>
            <div
              class={`flex flex-row mx-auto justify-center gap-6 ${
                isloading.value && fetchmode != "realtime" ? "shimmer z-0" : ""
              }`}
            >
              <section class="rounded flex flex-col">
                <h1 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                  Avrg. Price
                </h1>
                <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                  ${avrgprice.value}
                </h1>
              </section>
              <section class="rounded flex flex-col">
                <h2 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                  Mk. Cap
                </h2>
                <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                  ${formatNumber(avrgprice.value * totalsupply.value)}
                </h1>
              </section>
              <section class="rounded flex flex-col">
                <h1 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                  Liquidity
                </h1>
                <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                  ${fullliq.value}
                </h1>
              </section>
              <section class="rounded flex flex-col">
                <h1 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                  Max Δ
                </h1>
                <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                  {delta}%
                </h1>
              </section>
            </div>
            {loadingbar}
          </div>
        </>
      )}
    </>
  );
}
