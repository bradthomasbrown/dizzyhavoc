import { JSX } from "preact";
import { useState, useEffect } from "preact/hooks";

export default function TokenData() {
    const [price, setprice] = useState<number>(localStorage.getItem("price") ? Number(localStorage.getItem("price")) : 0);
    const fetchdata = async () => { // get price
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/dizzyhavoc" 
        );
        const data = await response.json();
        if (data) {
          const tickerdata = data.tickers;
          let totalprice = 0;
          for (let i = 0; i < tickerdata.length; i++) { // get average price from all available pairs
            totalprice = totalprice + tickerdata[i].converted_last.usd;
          }
          const avrgprice = totalprice / tickerdata.length;
          setprice(avrgprice); // set price
          localStorage.setItem("price", avrgprice.toString()); // save price to localstorage
        }
      } catch (error) {
        console.log(error);
      }
    };
    useState(() => {
        fetchdata();
        setInterval(fetchdata, 60000); // update price every minute
 })
 
return (
    <section class="rounded flex flex-col p-3 my-1 gap-3 mx-3">
            <h1 class="sm:text-[1.6rem] text-[1rem] flex justify-center items-center">Average Price
             <img title="Average price from all available pairs accross all chains" class="size-[17px] mt-1 mx-1 hover:scale-110" src="/help.png"></img>
             : ${price.toFixed(5)}
             </h1>
            <h2 class="sm:text-[1.6rem] text-[1rem] flex justify-center items-center">Market Cap
            <img title="Market Cap = Current Price x Circulating Supply" class="size-[17px] mt-1 mx-1 hover:scale-110" src="/help.png"></img>
            : ${(price*910778379).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </h2>
    </section>
);
}
