import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { formatNumber } from "../../lib/common/formatNumber.tsx";
import { MarketData } from "../../lib/stats/marketData.tsx";
export default function TokenSummary() {
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

  const fetchScreener = async () => {
    // req to dexscreener for live prices/ liq
    let arbprice = 0,
      ethprice = 0,
      bscprice = 0,
      baseprice = 0,
      avaxprice = 0;
    isloading.value = true;
    const data = await MarketData();
    let totalprice = 0;
    let totalliq = 0;
    for (let i = 0; i < data.pairs.length; i++) {
      const fixedvalue = Number(data.pairs[i].priceUsd).toFixed(5);
      const fixedliq = Number(data.pairs[i].liquidity.usd).toFixed(5);
      switch (data.pairs[i].url) {
        case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
          token_eth.value = ethprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq);
          break;
        case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
          token_arb.value = arbprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq);
          break;
        case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
          token_bsc.value = bscprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq);
          break;
        case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
          token_base.value = baseprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq);
          break;
        case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
          token_avax.value = avaxprice = Number(fixedvalue);
          totalprice += Number(fixedvalue);
          totalliq += Number(fixedliq);
          break;
        default:
          break;
      }
    }
    // assign full liq
    fullliq.value = formatNumber(totalliq) as number;
    // Calculate average price
    const avrg = totalprice / 5;
    const fixedavrg = avrg.toFixed(5);
    avrgprice.value = Number(fixedavrg);
    totalsupply.value = 946778380; // hard coded total supply
    largestPriceDelta(
      ethprice,
      arbprice,
      bscprice,
      baseprice,
      avaxprice,
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
        fetchScreener();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer();
      }
    }, 10);
  };

  useState(() => {
    // on load fetch data and start timer
    fetchScreener();
    starttimer();
  });

  const loadingbar = (
    <div class="bottom-[1px] px-[15px] absolute left-0 items-center justify-center rounded-xl h-[2px] w-full">
      <div
        class="h-[1px] bg-[#3d3d3d] dark:bg-[#d0d0d0] rounded-xl"
        style={`width: ${count}%`}
      >
      </div>
    </div>
  );
  return (
    <>
      {initialloading.value
        ? ( // no data : display loader
          <div class="sm:w-[465px] w-[350px] bg-blur3 shadow-lg px-0 relative 2xl:px-3 h-full justify-center items-center rounded-lg gap-0 xl:gap-3 flex flex-col">
            <img class="size-[50px]" src="./misc/loader.svg"></img>
          </div>
        )
        : ( 
          <>
            <div class={`shadow-lg h-full w-[350px] sm:w-[465px] justify-center relative rounded-lg gap-0 xl:gap-1 flex flex-col ${isloading.value? "loading" : "bg-blur3"}`}>
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
