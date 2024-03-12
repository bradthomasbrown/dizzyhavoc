import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function TokenData() {
  if (!IS_BROWSER) return <></>;
  const initialloading = useSignal<boolean>(true);
  const isloading = useSignal<boolean>(true);
  const count = useSignal<number>(30);
  // global market data
  const delta = useSignal<number>(0);
  const totalsupply = useSignal<number>(0);
  const avrgprice = useSignal<number>(0);
  const ath = useSignal<number>(0);
  // prices
  const token_eth = useSignal<number>(0);
  const token_arb = useSignal<number>(0);
  const token_bsc = useSignal<number>(0);
  const token_base = useSignal<number>(0);
  const token_avax = useSignal<number>(0);
  const poloniexprice = useSignal<number>(0);
  // liquidity
  const liq_eth = useSignal<number>(0);
  const liq_arb = useSignal<number>(0);
  const liq_bsc = useSignal<number>(0);
  const liq_base = useSignal<number>(0);
  const liq_avax = useSignal<number>(0);
  const liq_polo = useSignal<number>(0);
  // daily volume
  const vol24_eth = useSignal<number>(0);
  const vol24_arb = useSignal<number>(0);
  const vol24_bsc = useSignal<number>(0);
  const vol24_base = useSignal<number>(0);
  const vol24_avax = useSignal<number>(0);
  const vol24_polo = useSignal<number>(0);
  // index in token widget
  const arborder = useSignal<number>(0);
  const bscorder = useSignal<number>(0);
  const baseorder = useSignal<number>(0);
  const avaxorder = useSignal<number>(0);
  const ethorder = useSignal<number>(0);
  const poloorder = useSignal<number>(0);

  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
    token_avax: number,
    token_polo: number
  ) {
    const tokens = {
      Eth: token_eth,
      Arb: token_arb,
      Bsc: token_bsc,
      Base: token_base,
      Avax: token_avax,
      Poloniex: token_polo,
    };
    const sortedTokens = Object.entries(tokens).sort((a, b) => a[1] - b[1]); // Sort the tokens by price
    const lowestTokenPrice = sortedTokens[0][1]; // Extract the lowest token price
    const highestTokenPrice = sortedTokens[sortedTokens.length - 1][1]; // Extract the highest token price
    // Calculate the percentage change from the lowest token price to the highest token price
    const maxDeltaPercentage: number =
      ((highestTokenPrice - lowestTokenPrice) / lowestTokenPrice) * 100;
    // Extract the name of the lowest and highest tokens
    delta.value = Number(maxDeltaPercentage.toFixed(0));
    sortedTokens.forEach(([token], index) => {
      switch (token) {
        case "Eth":
          ethorder.value = index;
          break;
        case "Arb":
          arborder.value = index;
          break;
        case "Bsc":
          bscorder.value = index;
          break;
        case "Base":
          baseorder.value = index;
          break;
        case "Avax":
          avaxorder.value = index;
          break;
        case "Poloniex":
          poloorder.value = index;
          break;
        default:
          break;
      }
    });
  }

  const fetchPoloniex = async () => {
    isloading.value = true;
    try {
      const response = await fetch(
        "https://corsproxy.io/?https%3A%2F%2Fapi.poloniex.com%2Fmarkets%2FDZHV_USDT%2Fprice"
      ).then((response) => response.json());
      poloniexprice.value = response.price;
    } catch (error) {
      console.error(error);
      try {
        const response = await fetch(
          "https://api.allorigins.win/get?url=https://api.poloniex.com/markets/DZHV_USDT/price"
        ).then((response) => response.json());
        poloniexprice.value = JSON.parse(response.contents).price;
      } catch (error) {
        console.error(error);
      }
    }
    try {
      fetchScreener();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScreener = async () => { // main req to dexscreener for prices, failsafe with gecko
    let arbprice,
    ethprice,
    bscprice,
    baseprice,
    avaxprice = 0
    let poloprice = Number(poloniexprice.value) ? Number(poloniexprice.value) : 0;
    try {
      const response = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
      );
      const data = await response.json();
      let totalprice = 0;
      for (let i = 0; i < data.pairs.length; i++) {
        const fixedvalue = Number(data.pairs[i].priceUsd).toFixed(5);
        const fixedliq = Number(data.pairs[i].liquidity.usd).toFixed(2);
        switch (data.pairs[i].url) {
          case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
            token_eth.value = ethprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            liq_eth.value = fixedliq;
            vol24_eth.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
            token_arb.value = arbprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            liq_arb.value = fixedliq;
            vol24_arb.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
            token_bsc.value = bscprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            liq_bsc.value = fixedliq;
            vol24_bsc.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
            token_base.value = baseprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            liq_base.value = fixedliq;
            vol24_base.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
            token_avax.value = avaxprice = Number(fixedvalue);
            totalprice += Number(fixedvalue);
            liq_avax.value = fixedliq;
            vol24_avax.value = data.pairs[i].volume.h24;
            break;
          default:
            break;
        }
      }
      // Calculate average price
      if(poloprice!==0){
        const avrg =  ((Number(poloniexprice) + totalprice) / 6);
        let fixedavrg = avrg.toFixed(5)
        avrgprice.value = fixedavrg;
        }
        if(poloprice===0){
        const avrg = ( totalprice / 5 );
        let fixedavrg = avrg.toFixed(5)
        avrgprice.value = fixedavrg;
        }
      try {
        const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/dizzyhavoc"
        );
        const data = await response.json();
        // Set other market data
        ath.value = data.market_data.ath.usd;
        totalsupply.value = 946778380; // hard coded total supply
        // Calculate and update largest price delta
      } catch (error) {
        // gecko error for market data
        ath.value = 0.04093; // hard coded ath, last known
        console.log(error);
      }
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
      avaxprice,
      poloprice
    );
    isloading.value = false;
    initialloading.value = false;
  };

  const fetchGecko = async () => {  // failsafe req for arb, eth, bsc, base price // isnt as reliable as dexscreener
    let arbprice,
    ethprice,
    bscprice,
    baseprice,
    avaxprice = 0
    const poloprice = poloniexprice.value;
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
            token_eth.value = (ticker.converted_last.usd).toFixed(5);
            ethprice = (ticker.converted_last.usd).toFixed(5);
          } else if (ticker.market.name === "Pancakeswap V3 (BSC)") {
            token_bsc.value = (ticker.converted_last.usd).toFixed(5);
            bscprice = (ticker.converted_last.usd).toFixed(5);
          } else if (ticker.market.name === "Uniswap V3 (Base)") {
            token_base.value = (ticker.converted_last.usd).toFixed(5);
            baseprice = (ticker.converted_last.usd).toFixed(5);
          } else if (ticker.market.name === "Uniswap V3 (Arbitrum One)") {
            token_arb.value = (ticker.converted_last.usd).toFixed(5);
            arbprice = (ticker.converted_last.usd).toFixed(5);
          }
        }
      }
      // Set other market data
      ath.value = Number(data.market_data.ath.usd);
      totalsupply.value = 946778380; // hard coded total supply
      // Calculate average price
      avrgprice.value = ((Number(poloniexprice) + totalprice) / 5).toFixed(5);
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
      poloprice
    );
    isloading.value = false;
    initialloading.value = false;
  };

  function formatNumber(num: number, precision = 2) { // format num in K, M, B
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

  const starttimer = () => { // auto refresh logic
    let x = 30;
    const intervalId = setInterval(() => {
      if (x > 0) {
        x -= 1;
        count.value = x; // Update the progress value
      } else {
        fetchPoloniex();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer();
      }
    }, 1000);
  };

  useState(() => {
    // on load fetch data and start timer
    fetchPoloniex();
    starttimer();
  });

  return (
    <>
      {initialloading.value ? ( // display loader
        <div class="w-full h-full flex justify-center items-center">
          <img src="./loader.svg"></img>
        </div>
      ) : isloading.value ? (
        <>
          <div class="w-full h-full flex justify-center items-center">
            <div class="w-full shadow-lg px-0 absolute z-50 2xl:px-3 h-full justify-center  items-center rounded-lg gap-0 xl:gap-3 dark:bg-[#212121B3] bg-[#e8e8e8B3] flex flex-col">
              <img src="./loader.svg"></img>
            </div>
            <div class="w-full shadow-lg px-0  2xl:px-3 h-full justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-col">
              <div class="flex flex-row ">
                <div class="flex-col flex ">
                  <section class="rounded flex flex-col w-full py-3 my-1 gap-3 ml-3">
                    <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
                      Avrg. Price : ${avrgprice.value}
                    </h1>
                    <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
                      Mk. Cap : $
                      {formatNumber(avrgprice.value * totalsupply.value)}
                    </h2>
                  </section>
                </div>
                <div class="flex-row flex">
                  <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
                    <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
                      Max Δ : {delta}%
                    </h2>
                    <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center  tracking-tight items-center">
                      ATH : ${ath.value.toFixed(5)}
                    </h1>
                  </section>
                </div>
              </div>
              <div class="flex-row flex w-full">
                <section class="rounded ml-3 justify-center flex flex-wrap gap-3">
                  <h1 style={{ order: poloorder != null ? -poloorder : 0 }}>
                    <a
                      class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                      target="_blank"
                      href="https://poloniex.com/trade/DZHV_USDT/?type=spot"
                    >
                      <img
                        src="/token_polo.png"
                        class="size-6 flex flex-nowrap sm:size-8 hover:scale-[105%] mr-2"
                        title="$DZHV on Poloniex exchange"
                        alt="poloniex"
                      />{" "}
                      ${poloniexprice != null ? poloniexprice.value : ""}
                    </a>
                  </h1>
                  <a
                    target="_blank"
                    style={{ order: avaxorder != null ? -avaxorder : 0 }}
                    href="https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643"
                  >
                    <h1
                      class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                    >
                      <img
                        src="/token_avax.png"
                        class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                        title="$DZHV on avax"
                        alt="avax"
                      />{" "}
                      ${token_avax != null ? token_avax : ""}
                    </h1>
                  </a>
                  <a
                    target="_blank"
                    style={{ order: ethorder != null ? -ethorder : 0 }}
                    href="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
                  >
                    <h1
                      class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                    >
                      <img
                        src="/token_eth.png"
                        class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                        title="$DZHV on ethereum"
                        alt="ethereum"
                      />{" "}
                      ${token_eth != null ? token_eth : ""}
                    </h1>
                  </a>
                  <a
                    target="_blank"
                    style={{ order: arborder != null ? -arborder : 0 }}
                    href="https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83"
                  >
                    <h1
                      class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                    >
                      <img
                        src="/token_arb.png"
                        class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                        title="$DZHV on arbitrum"
                        alt="arbitrum"
                      />{" "}
                      ${token_arb != null ? token_arb : ""}
                    </h1>
                  </a>
                  <a
                    target="_blank"
                    style={{ order: bscorder != null ? -bscorder : 0 }}
                    href="https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5"
                  >
                    <h1
                      class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                    >
                      <img
                        src="/token_bsc.png"
                        class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                        title="$DZHV on binance chain"
                        alt="binance chain"
                      />{" "}
                      ${token_bsc != null ? token_bsc : ""}
                    </h1>
                  </a>
                  <a
                    target="_blank"
                    style={{ order: baseorder != null ? -baseorder : 0 }}
                    href="https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e"
                  >
                    <h1
                      class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                    >
                      <img
                        src="/token_base.png"
                        class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                        title="$DZHV on base"
                        alt="base"
                      />{" "}
                      ${token_base != null ? token_base : ""}
                    </h1>
                  </a>
                </section>
              </div>

              <div class="bottom-1 dark:text-[#d2d2d2] unselectable text-[#6e6e6e] absolute left-1 text-[11px]">
                data from dexscreener, coingecko & poloniex ({count})
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class="w-full shadow-lg px-0 relative  2xl:px-3 h-full justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-col">
          <div class="flex flex-row ">
            <div class="flex-col flex ">
              <section class="rounded flex flex-col w-full py-3 my-1 gap-3 ml-3">
                <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
                  Avrg. Price : ${avrgprice.value}
                </h1>
                <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
                  Mk. Cap : ${formatNumber(avrgprice.value * totalsupply.value)}
                </h2>
              </section>
            </div>
            <div class="flex-row flex">
              <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
                <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
                  Max Δ : {delta}%
                </h2>
                <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center  tracking-tight items-center">
                  ATH : ${ath.value.toFixed(5)}
                </h1>
              </section>
            </div>
          </div>
          <div class="flex-row relative flex w-full">
            <section class="rounded ml-3 justify-center flex flex-wrap gap-3">
              <h1 style={{ order: poloorder != null ? -poloorder : 0 }}>
                <a
                  class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                  target="_blank"
                  href="https://poloniex.com/trade/DZHV_USDT/?type=spot"
                >
                  <img
                    src="/token_polo.png"
                    class="size-6 flex flex-nowrap sm:size-8 hover:scale-[105%] mr-2"
                    title="$DZHV on Poloniex exchange"
                    alt="poloniex"
                  />{" "}
                  ${poloniexprice != null ? poloniexprice.value : ""}
                </a>
              </h1>
              <a
                target="_blank"
                style={{ order: avaxorder != null ? -avaxorder : 0 }}
                href="https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643"
              >
                <h1
                  class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                >
                  <img
                    src="/token_avax.png"
                    class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                    title="$DZHV on avax"
                    alt="avax"
                  />{" "}
                  ${token_avax != null ? token_avax : ""}
                </h1>
              </a>
              <a
                target="_blank"
                style={{ order: ethorder != null ? -ethorder : 0 }}
                href="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
              >
                <h1
                  class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                >
                  <img
                    src="/token_eth.png"
                    class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                    title="$DZHV on ethereum"
                    alt="ethereum"
                  />{" "}
                  ${token_eth != null ? token_eth : ""}
                </h1>
              </a>
              <a
                target="_blank"
                style={{ order: arborder != null ? -arborder : 0 }}
                href="https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83"
              >
                <h1
                  class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                >
                  <img
                    src="/token_arb.png"
                    class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                    title="$DZHV on arbitrum"
                    alt="arbitrum"
                  />{" "}
                  ${token_arb != null ? token_arb : ""}
                </h1>
              </a>
              <a
                target="_blank"
                style={{ order: bscorder != null ? -bscorder : 0 }}
                href="https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5"
              >
                <h1
                  class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                >
                  <img
                    src="/token_bsc.png"
                    class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                    title="$DZHV on binance chain"
                    alt="binance chain"
                  />{" "}
                  ${token_bsc != null ? token_bsc : ""}
                </h1>
              </a>
              <a
                target="_blank"
                style={{ order: baseorder != null ? -baseorder : 0 }}
                href="https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e"
              >
                <h1
                  class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}
                >
                  <img
                    src="/token_base.png"
                    class="size-6 sm:size-8 hover:scale-[105%] mr-2"
                    title="$DZHV on base"
                    alt="base"
                  />{" "}
                  ${token_base != null ? token_base : ""}
                </h1>
              </a>
            </section>
          </div>

          <div class="bottom-1 dark:text-[#d2d2d2] unselectable text-[#6e6e6e] absolute left-1 text-[11px]">
            data from dexscreener, coingecko & poloniex ({count})
          </div>
        </div>
      )}
    </>
  );
}