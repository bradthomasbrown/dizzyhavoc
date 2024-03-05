import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function TokenData() {
  if (!IS_BROWSER) return <></>;
  let ethprice = 0;
  // let avaxprice = 0;
  let bscprice = 0;
  let baseprice = 0;
  let arbprice = 0;
  const [count, setcount] = useState();
  const [delta, setdelta] = useState<number>(
    localStorage.getItem("delta") ? Number(localStorage.getItem("delta")) : 0,
  );
  const [low, setlow] = useState<number>(
    localStorage.getItem("low") ? Number(localStorage.getItem("low")) : 0,
  );
  const [high, sethigh] = useState<number>(
    localStorage.getItem("high") ? Number(localStorage.getItem("high")) : 0,
  );
  const [totalsupply, settotalsupply] = useState<number>(
    localStorage.getItem("supply") ? Number(localStorage.getItem("supply")) : 0,
  );
  const [avrgprice, setavrgprice] = useState<number>(
    localStorage.getItem("price") ? Number(localStorage.getItem("price")) : 0,
  );
  const [h24percent, seth24percent] = useState<number>(
    localStorage.getItem("h24") ? Number(localStorage.getItem("h24")) : 0,
  );
  const [ath, setath] = useState<number>(
    localStorage.getItem("ath") ? Number(localStorage.getItem("ath")) : 0,
  );
  const [token_eth, settoken_eth] = useState<number>(
    localStorage.getItem("price_eth") ? Number(localStorage.getItem("eth")) : 0,
  );
  const [token_arb, settoken_arb] = useState<number>(
    localStorage.getItem("price_arb") ? Number(localStorage.getItem("arb")) : 0,
  );
  const [token_bsc, settoken_bsc] = useState<number>(
    localStorage.getItem("price_bsc") ? Number(localStorage.getItem("bsc")) : 0,
  );
  const [token_base, settoken_base] = useState<number>(
    localStorage.getItem("price_base")
      ? Number(localStorage.getItem("base"))
      : 0,
  );
  // const [token_avax, settoken_avax] = useState<number>(
  //   localStorage.getItem("price_avax")
  //     ? Number(localStorage.getItem("avax"))
  //     : 0,
  // );
  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
  ) {
    const tokens = {
      Eth: token_eth,
      Arb: token_arb,
      Bsc: token_bsc,
      Base: token_base,
    };
    const sortedTokens = Object.entries(tokens).sort((a, b) => a[1] - b[1]); // Sort the tokens by price
    const lowestToken = sortedTokens[0];
    const highestToken = sortedTokens[sortedTokens.length - 1];
    // Find the maximum and minimum values
    const maxVal: number = Math.max(
      token_eth,
      token_arb,
      token_bsc,
      token_base,
    );
    const minVal: number = Math.min(
      token_eth,
      token_arb,
      token_bsc,
      token_base,
    );
    // Calculate the largest price delta difference
    const maxDelta: number = maxVal - minVal;
    setdelta(maxDelta.toFixed(5));
    sethigh(highestToken[0]);
    setlow(lowestToken[0]);
  }
  const fetchdata = async () => {
    // get price
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/dizzyhavoc",
      );
      const data = await response.json();
      if (data) {
        const tickerdata = data.tickers;
        let totalprice = 0;
        for (let i = 0; i < tickerdata.length; i++) {
          // get average price from all available pairs
          totalprice = totalprice + tickerdata[i].converted_last.usd;
          if (tickerdata[i].market.name == "Uniswap V3 (Ethereum)") {
            ethprice = tickerdata[i].converted_last.usd;
            settoken_eth(tickerdata[i].converted_last.usd);
            localStorage.setItem(
              "price_eth",
              tickerdata[i].converted_last.usd.toString(),
            );
          }
          if (tickerdata[i].market.name == "Pancakeswap V3 (BSC)") {
            bscprice = tickerdata[i].converted_last.usd;
            settoken_bsc(tickerdata[i].converted_last.usd);
            localStorage.setItem(
              "price_bsc",
              tickerdata[i].converted_last.usd.toString(),
            );
          }
          if (tickerdata[i].market.name == "Uniswap V3 (Base)") {
            baseprice = tickerdata[i].converted_last.usd;
            settoken_base(tickerdata[i].converted_last.usd);
            localStorage.setItem(
              "price_base",
              tickerdata[i].converted_last.usd.toString(),
            );
          }
          if (tickerdata[i].market.name == "Uniswap V3 (Arbitrum One)") {
            arbprice = tickerdata[i].converted_last.usd;
            settoken_arb(tickerdata[i].converted_last.usd);
            localStorage.setItem(
              "price_arb",
              tickerdata[i].converted_last.usd.toString(),
            );
          }
        }
        largestPriceDelta(ethprice, arbprice, bscprice, baseprice);
        const avrgprice = totalprice / tickerdata.length;
        seth24percent(data.market_data.price_change_percentage_24h);
        setavrgprice(avrgprice); // set price
        setath(data.market_data.ath.usd); // set ath
        settotalsupply(data.market_data.total_supply);
        localStorage.setItem("price", avrgprice.toString()); // save price to localstorage
        localStorage.setItem(
          "h24",
          data.market_data.price_change_percentage_24h.toString(),
        ); // save price to localstorage
        localStorage.setItem("ath", data.market_data.ath.usd.toString()); // save price to localstorage
        localStorage.setItem(
          "supply",
          data.market_data.total_supply.toString(),
        ); // save supply to localstorage
      }
    } catch (error) {
      console.log(error);
    }
  };

  function formatNumber(num: number, precision = 2) {
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

  const starttimer = () => {
    let x = 30;
    const intervalId = setInterval(() => {
      if (x > 0) {
        x -= 1;
        setcount(x); // Update the progress value
      } else {
        fetchdata();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer();
      }
    }, 1000);
  };

  useState(() => {
    fetchdata();
    starttimer();
  });

  return (
    <div class="w-full shadow-lg px-0  2xl:px-3 h-[30%] mt-[2rem] justify-center items-center gap-0 xl:gap-3 bg-blur flex flex-col xl:flex-row">
      <div class="flex flex-row">
        <div class="flex-col flex ">
          <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
            <h2 class="text-[1rem] font-[Poppins] flex justify-center tracking-tight items-center">
              {
                /* <img
                src="/token_avax.png"
                class="size-8 hover:scale-[105%]"
                title="$DZHV on avalanche"
                alt="avalanche"
              />
              <img
                title="To be implemented."
                class="size-[17px] mt-1 mx-1 hover:scale-110"
                src="/help.png"
              ></img>
              <a
                class="text-indigo-900 font-[Poppins]"
                target="_blank"
                href="https://dexscreener.com/avalanche/0xd1bfb54595ed5346f4fc87eb3813b7793c5a7ead"
              >
                here
              </a> */
              }
            </h2>
          </section>
        </div>
        <div class="flex-col flex ">
          <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
            <h1 class="text-[1rem] font-[Poppins] flex justify-center tracking-tight items-center">
              <img
                src="/token_eth.png"
                class="size-8 hover:scale-[105%] mr-2"
                title="$DZHV on ethereum"
                alt="ethereum"
              />{" "}
              ${token_eth.toFixed(5)}
            </h1>
            <h1 class="text-[1rem] font-[Poppins] flex justify-center tracking-tight items-center">
              <img
                src="/token_arb.png"
                class="size-8 hover:scale-[105%] mr-2"
                title="$DZHV on arbitrum"
                alt="arbitrum"
              />{" "}
              ${token_arb.toFixed(5)}
            </h1>
          </section>
        </div>
        <div class="flex-col flex ">
          <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
            <h1 class="text-[1rem] font-[Poppins] flex justify-center tracking-tight items-center">
              <img
                src="/token_bsc.png"
                class="size-8 hover:scale-[105%] mr-2"
                title="$DZHV on binance chain"
                alt="binance chain"
              />{" "}
              ${token_bsc.toFixed(5)}
            </h1>
            <h1 class="text-[1rem] font-[Poppins] flex justify-center tracking-tight items-center">
              <img
                src="/token_base.png"
                class="size-8 hover:scale-[105%] mr-2"
                title="$DZHV on base"
                alt="base"
              />{" "}
              ${token_base.toFixed(5)}
            </h1>
          </section>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex-col flex ">
          <section class="rounded flex flex-col w-full py-3 my-1 gap-3 ml-3">
            <h1 class="font-[Poppins] lg:text-[1rem] text-[0.8rem] inline justify-center tracking-tight items-center">
              Average Price : ${avrgprice.toFixed(5)}
            </h1>
            <h2 class="font-[Poppins] lg:text-[1rem] text-[0.8rem] inline justify-center tracking-tight items-center">
              Market Cap : ${formatNumber(avrgprice * totalsupply)}
            </h2>
          </section>
        </div>
        <div class="flex-col flex">
          <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
            <h2 class="font-[Poppins] lg:text-[1rem] text-[0.8rem] inline justify-center tracking-tight items-center">
              Max Δ : ${delta} {`↓ ${low} | ↑ ${high}`}
            </h2>
            <h1 class="font-[Poppins] lg:text-[1rem] text-[0.8rem] inline justify-center  tracking-tight items-center">
              ATH : ${ath.toFixed(5)}
            </h1>
          </section>
        </div>
      </div>
      <div className="absolute bottom-1 left-1 text-[10px]">{count}</div>
    </div>
  );
}
