import { useEffect, useState } from "preact/hooks";
import Summary from "./Summary.tsx";
import { Liquidity } from "./charts/weeklyLiquidity.tsx";
import { MarketCap } from "./charts/weeklyMkCap.tsx";
import { Average } from "./charts/weeklyAverage.tsx";
import MarketBarsContainer from "./MarketBarsContainer.tsx";
export default function ActiveContainer() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const items = [Summary, Liquidity, MarketCap, Average];
  function Skip() {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  }
  const CurrentItem = items[currentItemIndex];
  return (
    <div class="flex w-full mt-[1rem] mx-auto sm:w-[42rem] vignets flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
        <div onclick={() => Skip()} class="absolute cursor-pointer active:scale-[98%] z-[2] right-1 top-1">
          <img
            class="w-[1.5rem] h-[1.5rem] contrast-0"
            src="/misc/arrowright.svg"
          ></img>
        </div>
        <div class="w-full p-1">
          
        <CurrentItem/>
        </div>
      </div>
      <div class="flex mt-[0.3rem] h-full w-full sm:mx-0 mx-auto shadow-none sm:shadow-[0_0_15px_0_rgba(0,0,0,0.07)] rounded-xl bg-blur2">
        <div class="w-full p-1">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
