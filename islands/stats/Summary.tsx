import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Dex } from "../../lib/stats/Requests/Dex.tsx";
import { formatNumber } from "../../lib/common/formatNumber.tsx";
import { tokenCache } from "../../lib/stats/Requests/tokencache.tsx";
export function Summary() {
  if (!IS_BROWSER) return <></>;
  let data = tokenCache ? tokenCache : {};
  const initialloading = useSignal<boolean>(true);
  const isloading = useSignal<boolean>(true);
  const count = useSignal<number>(0);
  // global market data
  const delta = useSignal<number>(0);
  const totalsupply = useSignal<number>(0);
  const avrgprice = useSignal<number>(0);
  // liq
  const fullliq = useSignal<number>(0);

  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
    token_avax: number,
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

  const processData = async () => {
    await Dex();
    isloading.value = true;
    data = tokenCache;
    // req to dexscreener for live prices/ liq
    const totalliq = data.eth.liq+data.arb.liq+data.bsc.liq+data.base.liq+data.avax.liq;
    const totalprice = data.eth.price+data.arb.price+data.bsc.price+data.base.price+data.avax.price;
    // assign full liq
    fullliq.value = formatNumber(totalliq) as number;
    // Calculate average price
    const avrg = totalprice / 5;
    const fixedavrg = avrg.toFixed(5);
    avrgprice.value = Number(fixedavrg);
    totalsupply.value = 946778380; // hard coded total supply
    largestPriceDelta(
      data.eth.price,
      data.arb.price,
      data.bsc.price,
      data.base.price,
      data.avax.price,
    );
    isloading.value = false;
    initialloading.value = false;
  };

  const starttimer = () => {
    // auto refresh logic
    let x = 0;
    const intervalId = setInterval(() => {
      if (x < 100) {
        x += 0.05;
        count.value = x; // Update the progress value
      } else {
        isloading.value = true;
        setTimeout(() => {
          processData();
          starttimer();
        },250);
        clearInterval(intervalId); // Stop the interval when x reaches 100
      }
    }, 1);
  };

  useState(() => {
    // on load fetch data and start timer
    processData();
    starttimer();
  });

  const loadingbar = (
    <div class="bottom-[2px] px-[15px] absolute left-0 items-center justify-center rounded-xl h-[2px] w-full">
      <div
        class="rounded-xl h-[3px] bg-gradient-to-r from-transparent via-[#9b9b9b4f] to-[#9b9b9b] dark:bg-gradient-to-r dark:from-transparent dark:to-[#565656]"
        style={`width: ${count}%`}
      >
      </div>
    </div>
  );
  return (
    <>
      {initialloading.value
        ? ( // no data : display loader
          <div class="sm:w-[465px] w-[350px] bg-blur3 shadow-lg px-0 vignets relative 2xl:px-3 h-full justify-center items-center rounded-lg gap-0 xl:gap-3 flex flex-col">
            <img class="size-[50px]" src="./misc/loader.svg"></img>
          </div>
        )
        : (
          <>
            <div class={`h-full w-[350px] sm:w-[465px] justify-center relative rounded-lg gap-0 xl:gap-1 flex flex-col bg-blur3 ${isloading.value ? "shimmer" : ""}`}>
              <div class="flex flex-row mx-auto justify-center gap-6">
                <section class="rounded flex flex-col">
                  <h1 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                    Avrg. Price
                  </h1>
                  <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                    ${avrgprice.value}
                  </h1>
                </section>
                <section class="rounded flex flex-col">
                  <h2 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                    Mk. Cap
                  </h2>
                  <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                    ${formatNumber(avrgprice.value * totalsupply.value)}
                  </h1>
                </section>
                <section class="rounded flex flex-col">
                  <h1 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                    Liquidity
                  </h1>
                  <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                    ${fullliq.value}
                  </h1>
                </section>
                <section class="rounded flex flex-col">
                  <h1 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
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
