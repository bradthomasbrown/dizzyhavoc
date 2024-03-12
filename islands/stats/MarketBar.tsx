import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

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
  const liq_polo = useSignal<number>(0);
  // daily volume
  const vol24_eth = useSignal<number>(0);
  const vol24_arb = useSignal<number>(0);
  const vol24_bsc = useSignal<number>(0);
  const vol24_base = useSignal<number>(0);
  const vol24_avax = useSignal<number>(0);

  const fetchScreener = async () => { // main req to dexscreener for prices, failsafe with gecko
    isloading.value = true;
    try {
      const response = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
      );
      const data = await response.json();

      for (let i = 0; i < data.pairs.length; i++) {
        const fixedliq = Number(data.pairs[i].liquidity.usd).toFixed(2);
        switch (data.pairs[i].url) {
          case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
            liq_eth.value = fixedliq;
            vol24_eth.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
            liq_arb.value = fixedliq;
            vol24_arb.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
            liq_bsc.value = fixedliq;
            vol24_bsc.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
            liq_base.value = fixedliq;
            vol24_base.value = data.pairs[i].volume.h24;
            break;
          case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
            liq_avax.value = fixedliq;
            vol24_avax.value = data.pairs[i].volume.h24;
            break;
          default:
            break;
        }
      }
    } catch (error) {
      // dexscreener error for prices, failsafe gecko
      console.error(error);
      setTimeout(() => {
        fetchScreener();
      }, 500);
    }
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
      {initialloading.value ? ( // display loader
        <div class="w-full h-full flex justify-center items-center">
          <img src="./loader.svg"></img>
        </div>
      ) : (
        <div class="w-full flex sm:flex-row flex-col gap-2">
          <div class="w-full shadow-lg px-0 relative  2xl:px-3 h-[4rem] justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-row">
            <img
              src="/eth.svg"
              class="size-9 pl-4 hover:scale-[105%]"
              title="ethereum"
              alt="ethereum"
            />
            <div class="flex flex-col ">
              <div class="flex-col flex ">
                <section class="rounded flex flex-col w-full py-1 gap-3 ml-0">
                  <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    Eth. Liquidity : ${formatNumber(liq_eth.value)}
                  </h1>
                </section>
              </div>
              <div class="flex-col flex">
                <section class="rounded flex flex-col mx-auto w-full py-1 gap-3 ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    24h Vol. : ${vol24_eth.value.toLocaleString("en-US")}
                  </h2>
                </section>
              </div>
            </div>
          </div>
          <div class="w-full shadow-lg px-0 relative  2xl:px-3 h-[4rem] justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-row">
            <img
              src="/arb.svg"
              class="size-9 hover:scale-[105%]"
              title="arbitrum"
              alt="arbitrum"
            />
            <div class="flex flex-col ">
              <div class="flex-col flex ">
                <section class="rounded flex flex-col w-full py-1 gap-3 ml-0">
                  <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    Arb. Liquidity : ${formatNumber(liq_arb.value)}
                  </h1>
                </section>
              </div>
              <div class="flex-col flex">
                <section class="rounded flex flex-col mx-auto w-full py-1 gap-3 ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    24h Vol. : ${vol24_arb.value.toLocaleString("en-US")}
                  </h2>
                </section>
              </div>
            </div>
          </div>
          <div class="w-full shadow-lg px-0 relative  2xl:px-3 h-[4rem] justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-row">
            <img
              src="/avax.svg"
              class="size-9 hover:scale-[105%]"
              title="avalanche"
              alt="avalanche"
            />
            <div class="flex flex-col ">
              <div class="flex-col flex ">
                <section class="rounded flex flex-col w-full py-1 gap-3 ml-0">
                  <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    Avax Liquidity: ${formatNumber(liq_avax.value)}
                  </h1>
                </section>
              </div>
              <div class="flex-col flex">
                <section class="rounded flex flex-col mx-auto w-full py-1 gap-3 ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    24h Vol. : ${vol24_avax.value.toLocaleString("en-US")}
                  </h2>
                </section>
              </div>
            </div>
          </div>
          <div class="w-full shadow-lg px-0 relative  2xl:px-3 h-[4rem] justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-row">
            <img
              src="/base.svg"
              class="size-9 hover:scale-[105%]"
              title="base"
              alt="base"
            />
            <div class="flex flex-col ">
              <div class="flex-col flex ">
                <section class="rounded flex flex-col w-full py-1 gap-3 ml-0">
                  <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    Base Liquidity: ${formatNumber(liq_base.value)}
                  </h1>
                </section>
              </div>
              <div class="flex-col flex">
                <section class="rounded flex flex-col mx-auto w-full py-1 gap-3 ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    24h Vol. : ${vol24_base.value.toLocaleString("en-US")}
                  </h2>
                </section>
              </div>
            </div>
          </div>
          <div class="w-full shadow-lg px-0 relative  2xl:px-3 h-[4rem] justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-row">
            <img
              src="/bsc.svg"
              class="size-9 hover:scale-[105%]"
              title="binance chain"
              alt="binance chain"
            />
            <div class="flex flex-col ">
              <div class="flex-col flex ">
                <section class="rounded flex flex-col w-full py-1 gap-3 ml-0">
                  <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    Bsc Liquidity: ${formatNumber(liq_bsc.value)}
                  </h1>
                </section>
              </div>
              <div class="flex-col flex">
                <section class="rounded flex flex-col mx-auto w-full py-1 gap-3 ml-0">
                  <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1rem] inline justify-center tracking-tight items-center">
                    24h Vol. : ${vol24_bsc.value.toLocaleString("en-US")}
                  </h2>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}