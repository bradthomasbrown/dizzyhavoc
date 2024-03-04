import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";
import { useState, useEffect } from "preact/hooks";

export default function TokenData() {
  if (!IS_BROWSER) return <></>;
  const [count, setcount] = useState();
  const [totalsupply, settotalsupply] = useState<number>(
    localStorage.getItem("supply") ? Number(localStorage.getItem("supply")) : 0
  )
  const [price, setprice] = useState<number>(
    localStorage.getItem("price") ? Number(localStorage.getItem("price")) : 0
  );
  const [h24percent, seth24percent] = useState<number>(
    localStorage.getItem("h24") ? Number(localStorage.getItem("h24")) : 0
  );
  const [ath, setath] = useState<number>(
    localStorage.getItem("ath") ? Number(localStorage.getItem("ath")) : 0
  );
  const fetchdata = async () => {    
    // get price
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/dizzyhavoc"
      );
      const data = await response.json();
      if (data) {
        const tickerdata = data.tickers;
        let totalprice = 0;
        for (let i = 0; i < tickerdata.length; i++) {
          // get average price from all available pairs
          totalprice = totalprice + tickerdata[i].converted_last.usd;
        }
        const avrgprice = totalprice / tickerdata.length;
        seth24percent(data.market_data.price_change_percentage_24h);
        setprice(avrgprice); // set price
        setath(data.market_data.ath.usd); // set ath
        settotalsupply(data.market_data.total_supply);
        localStorage.setItem("price", avrgprice.toString()); // save price to localstorage
        localStorage.setItem(
          "h24",
          data.market_data.price_change_percentage_24h.toString()
        ); // save price to localstorage
        localStorage.setItem("ath", data.market_data.ath.usd.toString()); // save price to localstorage
        localStorage.setItem("supply", data.market_data.total_supply.toString()); // save supply to localstorage
      }
    } catch (error) {
      console.log(error);
    }
  };

  const starttimer = () => {
    let x = 30;
    const intervalId = setInterval(() => {
      if (x > 0) {
        x -= 1;
        setcount(x); // Update the progress value
      } else{
        fetchdata();
        clearInterval(intervalId); // Stop the interval when x reaches 100
        starttimer()
      }
    }, 1000)}
  
  useState(() => {
    fetchdata()
    starttimer()
   ;})

  return (
    
    <div class="sm:w-[80%] w-full h-[15%] justify-center rounded-xl items-center gap-3 bg-blur flex flex-row">
     <div class="flex-col flex ">
        <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
          <h1 class="lg:text-[1.6rem] sm:text-[1rem] text-[0.8rem] flex justify-center tracking-tight items-center">
            Average Price
            <img
              title="Average price from all available pairs accross all chains"
              class="size-[17px] mt-1 mx-1 hover:scale-110"
              src="/help.png"
            ></img>
            : ${price.toFixed(5)}
          </h1>
          <h2 class="lg:text-[1.6rem] sm:text-[1rem] text-[0.8rem] flex justify-center tracking-tight items-center">
            Market Cap
            <img
              title="Market Cap = Current Price x Circulating Supply"
              class="size-[17px] mt-1 mx-1 hover:scale-110"
              src="/help.png"
            ></img>
            : $
            {(price * totalsupply).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </section>
      </div>
      <div class="flex-col flex">
        <section class="rounded flex flex-col mx-auto w-full py-3 my-1 gap-3 ml-3">
          {h24percent > 0 ? (
            <h1 class="lg:text-[1.6rem] sm:text-[1rem] text-[0.8rem] flex justify-center  tracking-tight items-center">
              24H Change :{" "}
              <p class="text-[#5D9C59]"> +{h24percent.toFixed(1)}%</p>
            </h1>
          ) : (
            <h1 class="lg:text-[1.6rem] sm:text-[1rem] text-[0.8rem] flex justify-center  tracking-tight items-center">
              24H Change :{" "}
              <p class="text-[#DF2E38]">{h24percent.toFixed(1)}%</p>
            </h1>
          )}
          <h2 class="lg:text-[1.6rem] sm:text-[1rem] text-[0.8rem] flex justify-center tracking-tight items-center">
            ATH : ${ath.toFixed(5)}
          </h2>
        </section>
      </div>{" "}
      <div className="absolute bottom-1 left-1 text-[10px]">update in: {count}</div>
    </div>
  );
}
