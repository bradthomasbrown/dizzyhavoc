import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import EthChart from "../stats/charts/ethchart.tsx";
import ArbChart from "../stats/charts/arbchart.tsx";
import AvaxChart from "../stats/charts/avaxchart.tsx";
import BaseChart from "../stats/charts/basechart.tsx";
import BscChart from "../stats/charts/bscchart.tsx";
export default function MarketBar() {
  if (!IS_BROWSER) return <></>;
  const initialloading = useSignal<boolean>(true);
  const isloading = useSignal<boolean>(true);
  const count = useSignal<number>(30);
  // liquidity
  const liq_eth = useSignal<number>(0);
  const liq_arb = useSignal<number>(0);
  const liq_bsc = useSignal<number>(0);
  const liq_base = useSignal<number>(0);
  const liq_avax = useSignal<number>(0);
  // daily volume
  const vol24_eth = useSignal<number>(0);
  const vol24_arb = useSignal<number>(0);
  const vol24_bsc = useSignal<number>(0);
  const vol24_base = useSignal<number>(0);
  const vol24_avax = useSignal<number>(0);
  // prices
  const token_eth = useSignal<number>(0);
  const token_arb = useSignal<number>(0);
  const token_bsc = useSignal<number>(0);
  const token_base = useSignal<number>(0);
  const token_avax = useSignal<number>(0);
  // txn count
  const tx_eth = useSignal<number>(0);
  const tx_arb = useSignal<number>(0);
  const tx_bsc = useSignal<number>(0);
  const tx_base = useSignal<number>(0);
  const tx_avax = useSignal<number>(0);
  // index in MarketBar column
  const arborder = useSignal<number>(0);
  const bscorder = useSignal<number>(0);
  const baseorder = useSignal<number>(0);
  const avaxorder = useSignal<number>(0);
  const ethorder = useSignal<number>(0);

  const a = async () => { 
    isloading.value = true;
    let arbprice = 0,
    ethprice = 0,
    bscprice = 0,
    baseprice = 0,
    avaxprice = 0
    try {
      const response = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
      );
      const data = await response.json();
      for (let i = 0; i < data.pairs.length; i++) {
        const fixedvalue = Number(data.pairs[i].priceUsd).toFixed(5);
        const fixedliq = Number(data.pairs[i].liquidity.usd).toFixed(2);
        switch (data.pairs[i].url) {
          case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
            token_eth.value = ethprice = Number(fixedvalue);
            liq_eth.value = fixedliq;
            vol24_eth.value = data.pairs[i].volume.h24; 
            tx_eth.value = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
            break;
          case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
            token_arb.value = arbprice = Number(fixedvalue);
            liq_arb.value = fixedliq;
            vol24_arb.value = data.pairs[i].volume.h24;
            tx_arb.value = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
            break;
          case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
            token_bsc.value = bscprice = Number(fixedvalue);
            liq_bsc.value = fixedliq;
            vol24_bsc.value = data.pairs[i].volume.h24;
            tx_bsc.value = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
            break;
          case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
            token_base.value = baseprice = Number(fixedvalue);
            liq_base.value = fixedliq;
            vol24_base.value = data.pairs[i].volume.h24;
            tx_base.value = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
            break;
          case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
            token_avax.value = avaxprice = Number(fixedvalue);
            liq_avax.value = fixedliq;
            vol24_avax.value = data.pairs[i].volume.h24;
            tx_avax.value = data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        a();
      }, 500);
    }
    largestPriceDelta(
      ethprice,
      arbprice,
      bscprice,
      baseprice,
      avaxprice, )
    isloading.value = false;
    initialloading.value = false;
  };
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
        default:
          break;
      }
    });
  }

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
        a();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer();
      }
    }, 1000);
  };

  useState(() => {
    // on load fetch data and start timer
    a();
    starttimer();
  });

  return (
    <>
      {initialloading.value ? ( // display loader
        <div class="w-full h-full flex justify-center items-center">
          <img src="./misc/loader.svg"></img>
        </div>
      ) : ( // loaded bar
        <div class="w-full flex flex-col gap-2">
          <div style={{ order: ethorder != null ? -ethorder : 0 }} class="w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3">
            <a class="sm:size-11 hover:scale-[105%] ml-3 mt-3 sm:ml-6 sm:mt-6 justify-start size-9" title="open in dexscreener" target="_blank" href="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81">
          <img
              src="/chains/token_eth.png"
              title="open in dexscreener"
              alt="eth"
            />
            </a>
            <div class="flex items-start sm:items-center flex-row">
              <div class="flex gap-3 sm:gap-0  mx-3 sm:flex-col flex-row">
              <div class="flex sm:flex-row flex-col">
                <section class="rounded flex flex-col w-full py-[1px] ml-0">
                  <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">${formatNumber(token_eth.value)}</h1>
                </section>
              </div>
              <div class="flex sm:flex-row flex-col">
                <section class="rounded flex flex-col w-full py-[1px] ml-0">
                  <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  Liquidity: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(liq_eth.value)}</h1>
                  </h1>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
                <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Vol: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(vol24_eth.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
                <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Tx: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">{tx_eth.value}</h1>
                  </h2>
                </section>
              </div>
              </div>
              <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
                <EthChart />
              </div>
            </div>
          </div>
          <div style={{ order: arborder != null ? -arborder : 0 }} class="w-full relative shadow-lg h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3 flex">
          <a class="sm:size-11 hover:scale-[105%] ml-3 mt-3 sm:ml-6 sm:mt-6 justify-start size-9" title="open in dexscreener" target="_blank" href="https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83">
          <img
              src="/chains/token_arb.png"
              title="open in dexscreener"
              alt="arb"
            />
            </a>
            <div class="flex items-start sm:items-center flex-row">
              <div class="flex gap-3 sm:gap-0  mx-3 sm:flex-col flex-row">
              <div class="flex sm:flex-row flex-col">
                <section class="rounded flex flex-col w-full py-[1px] ml-0">
                  <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">${formatNumber(token_arb.value)}</h1>
                </section>
              </div>
              <div class="flex sm:flex-row flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  Liquidity: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(liq_arb.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Vol: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(vol24_arb.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
                <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Tx: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">{tx_arb.value}</h1>
                  </h2>
                </section>
              </div>
              </div>
              <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
                <ArbChart />
              </div>
            </div>
          </div>
          <div style={{ order: avaxorder != null ? -avaxorder : 0 }} class="w-full relative shadow-lg h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3 flex">
          <a class="sm:size-11 hover:scale-[105%] ml-3 mt-3 sm:ml-6 sm:mt-6 justify-start size-9" title="open in dexscreener" target="_blank" href="https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643">
          <img
              src="/chains/token_avax.png"
              title="open in dexscreener"
              alt="avax"
            />
            </a>
            <div class="flex items-start sm:items-center flex-row">
              <div class="flex gap-3 sm:gap-0  mx-3 sm:flex-col flex-row">
              <div class="flex sm:flex-row flex-col">
                <section class="rounded flex flex-col w-full py-[1px] ml-0">
                  <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">${formatNumber(token_avax.value)}</h1>
                </section>
              </div>
              <div class="flex sm:flex-row flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  Liquidity: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(liq_avax.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Vol: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(vol24_avax.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
                <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Tx: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">{tx_avax.value}</h1>
                  </h2>
                </section>
              </div>
              </div>
              <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
                <AvaxChart />
              </div>
            </div>
          </div>
          <div style={{ order: baseorder != null ? -baseorder : 0 }} class="w-full relative shadow-lg h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3 flex">
          <a class="sm:size-11 hover:scale-[105%] ml-3 mt-3 sm:ml-6 sm:mt-6 justify-start size-9" title="open in dexscreener" target="_blank" href="https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e">
          <img
              src="/chains/token_base.png"
              title="open in dexscreener"
              alt="base"
            />
            </a>
            <div class="flex items-start sm:items-center flex-row">
              <div class="flex gap-3 sm:gap-0  mx-3 sm:flex-col flex-row">
              <div class="flex sm:flex-row flex-col">
                <section class="rounded flex flex-col w-full py-[1px] ml-0">
                  <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">${formatNumber(token_base.value)}</h1>
                </section>
              </div>
              <div class="flex sm:flex-row flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  Liquidity: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(liq_base.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Vol: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(vol24_base.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
                <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Tx: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">{tx_base.value}</h1>
                  </h2>
                </section>
              </div>
              </div>
              <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
                <BaseChart />
              </div>
            </div>
          </div>
          <div style={{ order: bscorder != null ? -bscorder : 0 }} class="w-full relative shadow-lg h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3 flex">
          <a class="sm:size-11 hover:scale-[105%] ml-3 mt-3 sm:ml-6 sm:mt-6 justify-start size-9" title="open in dexscreener" target="_blank" href="https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5">
          <img
              src="/chains/token_bsc.png"
              title="open in dexscreener"
              alt="bsc"
            />
            </a>
            <div class="flex items-start sm:items-center flex-row">
              <div class="flex gap-3 sm:gap-0  mx-3 sm:flex-col flex-row">
              <div class="flex sm:flex-row flex-col">
                <section class="rounded flex flex-col w-full py-[1px] ml-0">
                  <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">${formatNumber(token_bsc.value)}</h1>
                </section>
              </div>
              <div class="flex sm:flex-row flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  Liquidity: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(liq_bsc.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
              <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Vol: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">${formatNumber(vol24_bsc.value)}</h1>
                  </h2>
                </section>
              </div>
              <div class="flex flex-row sm:flex-col">
                <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-[0.7rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                  24h Tx: <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[1rem] inline">{tx_bsc.value}</h1>
                  </h2>
                </section>
              </div>
              </div>
              <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
                <BscChart/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}