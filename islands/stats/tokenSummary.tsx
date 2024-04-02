import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function TokenSummary() {
  if (!IS_BROWSER) return <></>;
  const initialloading = useSignal<boolean>(true);
  const isloading = useSignal<boolean>(true);
  const count = useSignal<number>(30);
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

  const fetchScreener = async () => {
    // main req to dexscreener for prices, failsafe with gecko
    let arbprice = 0,
      ethprice = 0,
      bscprice = 0,
      baseprice = 0,
      avaxprice = 0;
    try {
      const response = await fetch(
        "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
      );
      const data = await response.json();
      let totalprice = 0;
      for (let i = 0; i < data.pairs.length; i++) {
        const fixedvalue = Number(data.pairs[i].priceUsd).toFixed(5);
        switch (data.pairs[i].url) {
          case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
            token_eth.value = ethprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            break;
          case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
            token_arb.value = arbprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            break;
          case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
            token_bsc.value = bscprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            break;
          case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
            token_base.value = baseprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            break;
          case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
            token_avax.value = avaxprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            break;
          default:
            break;
        }
      }
      try {
        const response = await fetch(
          "https://quick-frog-59.deno.dev/v1/fullliq"
        );
        const data = await response.json();
        const lastliq = data[data.length - 1];
        const liq = lastliq.arb_liq+lastliq.eth_liq+lastliq.bsc_liq+lastliq.base_liq+lastliq.avax_liq;
        fullliq.value = formatNumber(liq)
      } catch (error) {
        console.error(error);
      }
      // Calculate average price
        const avrg = totalprice / 5;
        const fixedavrg = avrg.toFixed(5);
        avrgprice.value = Number(fixedavrg);
        totalsupply.value = 946778380; // hard coded total supply
    } catch (error) {
      // dexscreener error for prices, failsafe gecko
      console.error(error);
      fetchGecko();
    }
    largestPriceDelta(
      ethprice,
      arbprice,
      bscprice,
      baseprice,
      avaxprice
    );
    isloading.value = false;
    initialloading.value = false;
  };

  const fetchGecko = async () => {
    // failsafe req for arb, eth, bsc, base price // isnt as reliable as dexscreener
    let arbprice = 0,
      ethprice = 0,
      bscprice = 0,
      baseprice = 0,
      avaxprice = 0;
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/dizzyhavoc"
      );
      const data = await response.json();
      if (!data) return;
      const tickerdata = data.tickers;
      let totalprice = 0;
      for (let i = 0; i < tickerdata.length; i++) {
        const ticker = tickerdata[i];
        // Filter out doubles and unsafe markets for arb(yellow) and bsc
        if (
          !(
            ticker.target === "0XBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C" ||
            ticker.trust_score === "yellow"
          )
        ) {
          // Calculate total price
          totalprice += ticker.converted_last.usd;
          // Set token prices based on market name
          if (ticker.market.name === "Uniswap V3 (Ethereum)") {
            token_eth.value = ticker.converted_last.usd.toFixed(5);
            ethprice = ticker.converted_last.usd.toFixed(5);
          } else if (ticker.market.name === "Pancakeswap V3 (BSC)") {
            token_bsc.value = ticker.converted_last.usd.toFixed(5);
            bscprice = ticker.converted_last.usd.toFixed(5);
          } else if (ticker.market.name === "Uniswap V3 (Base)") {
            token_base.value = ticker.converted_last.usd.toFixed(5);
            baseprice = ticker.converted_last.usd.toFixed(5);
          } else if (ticker.market.name === "Uniswap V3 (Arbitrum One)") {
            token_arb.value = ticker.converted_last.usd.toFixed(5);
            arbprice = ticker.converted_last.usd.toFixed(5);
          }
        }
      }
      // Set other market data
      totalsupply.value = 946778380; // hard coded total supply
      // Calculate average price
      avrgprice.value = Number(((totalprice) / 5).toFixed(5));
    } catch (error) {
      console.error(error);
    }
    // Calculate and update largest price delta
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

  function formatNumber(num: number, precision = 2) {
    // format num in K, M, B
    const map = [
      { suffix: "T", threshold: 1e12 },
      { suffix: "B", threshold: 1e9 },
      { suffix: "M", threshold: 1e6 },
      { suffix: "K", threshold: 1e3 },
      { suffix: "", threshold: 1 },
    ];
    const found = map.find((x) => Math.abs(num) >= x.threshold);
    if (found) {
      const formatted =
        (num / found.threshold).toFixed(precision) + found.suffix;
      return formatted;
    }
    return num;
  }

  const starttimer = () => {
    // auto refresh logic
    let x = 30;
    const intervalId = setInterval(() => {
      if (x > 0) {
        x -= 1;
        count.value = x; // Update the progress value
      } else {
        fetchScreener();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer();
      }
    }, 1000);
  };

  useState(() => {
    // on load fetch data and start timer
    fetchScreener();
    starttimer();
  });

  return (
    <>
      {initialloading.value ? ( // no data : display loader
        <div class="w-[332px] sm:w-[405px] shadow-lg px-0 relative  2xl:px-3 h-full justify-center  items-center rounded-lg gap-0 xl:gap-3 flex flex-col">
          <img src="./misc/loader.svg"></img>
        </div>
      ) : isloading.value ? ( // widget with blurred loader for desktop
         <>
         
         <div class="shadow-lg px-3 h-full justify-center relative  rounded-lg gap-0 xl:gap-1 bg-blur3 flex flex-col">
         <div class="w-full shadow-lg px-0 absolute bottom-0 right-0 z-50 2xl:px-3 h-full justify-center items-center rounded-lg gap-0 xl:gap-3 dark:bg-[#212121B3] bg-[#e8e8e8B3] flex flex-col">
                <img src="./misc/loader.svg"></img>
              </div>
           <div class="flex flex-row mx-auto justify-center gap-6">
             <section class="rounded flex flex-col">
               <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                 Avrg. Price
               </h1>
               <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium text-[1rem] sm:text-[1.35rem] inline">
                 ${avrgprice.value}
               </h1>
             </section>
             <section class="rounded flex flex-col">
               <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                 Mk. Cap
                 <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium  text-[1rem] sm:text-[1.35rem] inline">
                   ${formatNumber(avrgprice.value * totalsupply.value)}
                 </h1>
               </h2>
             </section>
             <section class="rounded flex flex-col">
               <h1 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                 Liquidity
               </h1>
               <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium  text-[1rem] sm:text-[1.35rem] inline">
                 ${fullliq.value}
               </h1>
             </section>
             <section class="rounded flex flex-col">
               <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                 Max Δ
               </h1>
               <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium  text-[1rem] sm:text-[1.35rem] inline">
                 {delta}%
               </h1>
             </section>

           </div>
           <div
             title="data from dexscreener, coingecko & poloniex."
             class="bottom-1 unselectable dark:text-[#d2d2d2] text-[#6e6e6e] absolute left-1 text-[11px]"
           >
             {count}
           </div>
         </div>
       </>
      ) : (
        // loaded
        <>
          <div class="shadow-lg px-3 h-full justify-center relative rounded-lg gap-0 xl:gap-1 bg-blur3 flex flex-col">
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
                <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium  text-[1rem] sm:text-[1.35rem] inline">
                    ${formatNumber(avrgprice.value * totalsupply.value)}
                  </h1>
              </section>
              <section class="rounded flex flex-col">
               <h1 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                 Liquidity
               </h1>
               <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium  text-[1rem] sm:text-[1.35rem] inline">
                 ${fullliq.value}
               </h1>
             </section>
              <section class="rounded flex flex-col">
                <h1 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[0.7rem] sm:text-[0.75rem] flex flex-col justify-center tracking-tight items-center">
                  Max Δ
                </h1>
                <h1 class="font-[Poppins] text-[#000000] dark:text-[#ffffff] font-medium  text-[1rem] sm:text-[1.35rem] inline">
                  {delta}%
                </h1>
              </section>
            </div>
            <div
              title="data from dzhv, dexscreener & coingecko apis."
              class="top-1 unselectable dark:text-[#d2d2d2] text-[#6e6e6e] absolute right-1 text-[8px]"
            >
              {count}
            </div>
          </div>
        </>
      )}
    </>
  );
}