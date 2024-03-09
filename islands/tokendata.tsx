import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function TokenData() {
  if (!IS_BROWSER) return <></>;
  let avaxprice = 0;
  const count = useSignal<number>(30);
  const athdate = useSignal<string>("unknown");
  const delta = useSignal<number>(
    localStorage.getItem("delta") ? Number(localStorage.getItem("delta")) : 0,
  );
  const low = useSignal<string>(
    localStorage.getItem("low") ? (localStorage.getItem("low")) as string : "");
  const high = useSignal<string>(
    localStorage.getItem("high") ? (localStorage.getItem("high")) as string : "");
  const totalsupply = useSignal<number>(
    localStorage.getItem("supply") ? Number(localStorage.getItem("supply")) : 0,
  );
  const avrgprice = useSignal<number>(
    localStorage.getItem("price") ? Number(localStorage.getItem("price")) : 0,
  );
  const h24percent = useSignal<number>(
    localStorage.getItem("h24") ? Number(localStorage.getItem("h24")) : 0,
  );
  const ath = useSignal<number>(
    localStorage.getItem("ath") ? Number(localStorage.getItem("ath")) : 0,
  );
  const token_eth = useSignal<number>(
    localStorage.getItem("price_eth") ? Number(localStorage.getItem("eth")) : 0,
  );
  const token_arb = useSignal<number>(
    localStorage.getItem("price_arb") ? Number(localStorage.getItem("arb")) : 0,
  );
  const token_bsc = useSignal<number>(
    localStorage.getItem("price_bsc") ? Number(localStorage.getItem("bsc")) : 0,
  );
  const token_base = useSignal<number>(
    localStorage.getItem("price_base")
      ? Number(localStorage.getItem("base"))
      : 0,
  );
  const token_avax = useSignal<number>(
    localStorage.getItem("price_avax")
      ? Number(localStorage.getItem("avax"))
      : 0,
  );
  const poloniexprice = useSignal<number>(
    localStorage.getItem("poloniexprice") ? Number(localStorage.getItem("poloniexprice")) : 0,
  );
  const arborder = useSignal<number>(0)
  const bscorder = useSignal<number>(0)
  const baseorder = useSignal<number>(0)
  const avaxorder = useSignal<number>(0)
  const ethorder = useSignal<number>(0)
  const poloorder = useSignal<number>(0)
  
  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
    token_avax: number,
    token_polo : number,
  ) {
    const tokens = {
      Eth: token_eth,
      Arb: token_arb,
      Bsc: token_bsc,
      Base: token_base,
      Avax: token_avax,
      Poloniex: token_polo
    };
  
    const sortedTokens = Object.entries(tokens).sort((a, b) => a[1] - b[1]); // Sort the tokens by price
    const lowestTokenPrice = sortedTokens[0][1]; // Extract the lowest token price
    const highestTokenPrice = sortedTokens[sortedTokens.length - 1][1]; // Extract the highest token price
  
    // Calculate the percentage change from the lowest token price to the highest token price
    const maxDeltaPercentage: number = (((highestTokenPrice - lowestTokenPrice) / lowestTokenPrice)*100);
  
    // Extract the name of the lowest and highest tokens
    delta.value = (Number(maxDeltaPercentage.toFixed(0)));
    low.value = (sortedTokens[0][0]); // Extract the name of the lowest token
    high.value = (sortedTokens[sortedTokens.length - 1][0]); // Extract the name of the highest token
    sortedTokens.forEach(([token], index) => {
      switch (token) {
        case 'Eth':
          ethorder.value = (index);
          break;
        case 'Arb':
          arborder.value = (index);
          break;
        case 'Bsc':
          bscorder.value = (index);
          break;
        case 'Base':
          baseorder.value = (index);
          break;
        case 'Avax':
          avaxorder.value = (index)
          break;
        case 'Poloniex':
          poloorder.value = (index)
          break;
        default:
          break;
      }
    });

  }
  const fetchAvax = async () => { // req just for avax, if success req the rest (order needed for averageprice and largestdelta)
    try {
      const response = await fetch(
        "https://api.dexscreener.com/latest/dex/tokens/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE",
      );
      const data = await response.json();
      if (data) {
        for (let i = 0; i < data.pairs.length; i++) {
          if (data.pairs[i].pairCreatedAt == "1708990072000") { // filtering via pair epoch creation time 
            token_avax.value = Number(data.pairs[i].priceUsd);
            avaxprice = Number(data.pairs[i].priceUsd);
            localStorage.setItem(
              "price_avax",
              (Number(data.pairs[i].priceUsd)).toFixed(8),
            )
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    try {
      fetchPoloniex();
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPoloniex = async () => {
    try {
      const response = await fetch(
        "https://corsproxy.io/?https%3A%2F%2Fapi.poloniex.com%2Fmarkets%2FDZHV_USDT%2Fprice",
      ).then((response) => response.json());
      poloniexprice.value = response.price
    } catch (error) {
      console.log(error)
    }
    try {
      fetchdata();
    } catch (error) {
      console.log(error)
    }
  };
  const fetchdata = async () => { // req for arb, eth, bsc, base
    let arbprice = 0;
    let ethprice = 0;
    let bscprice = 0;
    let baseprice = 0;
    const poloprice = poloniexprice.value;
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/dizzyhavoc"
      );
      const data = await response.json();
      if (!data) return;
      const tickerdata = data.tickers;
      let averageprice = 0,
      totalprice = 0;
      for (let i = 0; i < tickerdata.length; i++) {
        const ticker = tickerdata[i];
        // Filter out doubles and unsafe markets for arb(yellow) and bsc
        if (!(ticker.target === "0XBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C" || ticker.trust_score === "yellow")) {
          // Calculate total price
          totalprice += ticker.converted_last.usd;
          // Set token prices based on market name
          if (ticker.market.name === "Uniswap V3 (Ethereum)") {
            token_eth.value = (ticker.converted_last.usd);
            ethprice = ticker.converted_last.usd;
            localStorage.setItem("price_eth", ticker.converted_last.usd.toString());
          } else if (ticker.market.name === "Pancakeswap V3 (BSC)") {
            token_bsc.value = (ticker.converted_last.usd);
            bscprice = ticker.converted_last.usd;
            localStorage.setItem("price_bsc", ticker.converted_last.usd.toString());
          } else if (ticker.market.name === "Uniswap V3 (Base)") {
            token_base.value = (ticker.converted_last.usd);
            baseprice = ticker.converted_last.usd;
            localStorage.setItem("price_base", ticker.converted_last.usd.toString());
          } else if (ticker.market.name === "Uniswap V3 (Arbitrum One)") {
            token_arb.value = (ticker.converted_last.usd);
            arbprice = ticker.converted_last.usd;
            localStorage.setItem("price_arb", ticker.converted_last.usd.toString());
          }
        }
      }
      // Calculate average price
      averageprice = (Number(poloniexprice)+avaxprice+totalprice) / 6;
      avrgprice.value = (averageprice);
      localStorage.setItem("price", averageprice.toFixed(8));
  
      // Set other market data
      h24percent.value = (data.market_data.price_change_percentage_24h);
      ath.value = (data.market_data.ath.usd);
      athdate.value = ((data.market_data.ath_date.usd).toString().slice(0, 10));
      totalsupply.value = (data.market_data.total_supply);
      localStorage.setItem("h24", data.market_data.price_change_percentage_24h.toString());
      localStorage.setItem("ath", data.market_data.ath.usd.toString());
      localStorage.setItem("supply", data.market_data.total_supply.toString());
  
      // Calculate and update largest price delta
      largestPriceDelta(ethprice, arbprice, bscprice, baseprice, avaxprice, poloprice);
    } catch (error) {
      console.error(error);
    }
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
      const formatted = (num / found.threshold).toFixed(precision) +
        found.suffix;
      return formatted;
    }
    return num;
  }
  const starttimer = () => { // auto refresh logic
    let x = 30;
    const intervalId = setInterval(() => {
      if (x > 0) {
        x -= 1;
        count.value = (x); // Update the progress value
      } else {
        fetchAvax();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer();
      }
    }, 1000);
  };

  useState(() => { // on load fetch data and start timer
    fetchAvax(); 
    starttimer();
  });

  return (

    <div class="w-full shadow-lg px-0  2xl:px-3 h-[30%] justify-center  items-center rounded-lg gap-0 xl:gap-3 bg-blur3 flex flex-col">
            <div class="flex flex-row ">
        <div class="flex-col flex ">
          <section class="rounded flex flex-col w-full py-3 my-1 gap-3 ml-3">
            <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[0.8rem] sm:text-[1.2rem] inline justify-center tracking-tight items-center">
              Avrg. Price : ${avrgprice.value.toFixed(5)}
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
        <div class="flex-row flex w-full justify-center">
        <section class="rounded justify-center flex flex-wrap gap-3">
          
        <h1 style={{ order: poloorder != null ? -poloorder : 0 }}  >
          <a class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`} target="_blank"  href="https://poloniex.com/trade/DZHV_USDT/?type=spot">
        <img
            src="/token_polo.png"
            class="size-6 flex flex-nowrap sm:size-8 hover:scale-[105%] mr-2"
            title="$DZHV on Poloniex exchange"
            alt="poloniex"
        />{" "}
        ${poloniexprice != null ? poloniexprice.value : ''}</a>
        </h1>
    <a target="_blank" style={{ order: avaxorder != null ? -avaxorder : 0 }} href="https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643">
      <h1 class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}>
        <img
            src="/token_avax.png"
            class="size-6 sm:size-8 hover:scale-[105%] mr-2"
            title="$DZHV on avax"
            alt="avax"
        />{" "}
        ${token_avax != null ? token_avax.value.toFixed(5) : ''}
    </h1></a>
    <a target="_blank" style={{ order: ethorder != null ? -ethorder : 0 }} href="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81">
    <h1 class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}>
        <img
            src="/token_eth.png"
            class="size-6 sm:size-8 hover:scale-[105%] mr-2"
            title="$DZHV on ethereum"
            alt="ethereum"
        />{" "}
        ${token_eth != null ? token_eth.value.toFixed(5) : ''}
    </h1>
    </a>
    <a target="_blank" style={{ order: arborder != null ? -arborder : 0 }} href="https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83">
    <h1 class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}>
        <img
            src="/token_arb.png"
            class="size-6 sm:size-8 hover:scale-[105%] mr-2"
            title="$DZHV on arbitrum"
            alt="arbitrum"
        />{" "}
        ${token_arb != null ? token_arb.value.toFixed(5) : ''}
    </h1>
    </a> 
    <a target="_blank" style={{ order: bscorder != null ? -bscorder : 0 }} href="https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5">
    <h1 class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}>
        <img
            src="/token_bsc.png"
            class="size-6 sm:size-8 hover:scale-[105%] mr-2"
            title="$DZHV on binance chain"
            alt="binance chain"
        />{" "}
        ${token_bsc != null ? token_bsc.value.toFixed(5) : ''}
    </h1>
</a>
<a target="_blank" style={{ order: baseorder != null ? -baseorder : 0 }} href="https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e">
    <h1 class={`text-[1.1rem] dark:text-[#d2d2d2] font-[Poppins] flex`}>
        <img
            src="/token_base.png"
            class="size-6 sm:size-8 hover:scale-[105%] mr-2"
            title="$DZHV on base"
            alt="base"
        />{" "}
        ${token_base != null ? token_base.value.toFixed(5) : ''}
    </h1>
    </a>
</section>
      </div>
      <div className="mb-2 dark:text-[#d2d2d2] text-[10px] sm:text-[13px]">update in: {count}</div>
    </div>
     

  );
}
