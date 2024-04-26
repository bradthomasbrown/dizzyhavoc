import { useState } from "preact/hooks";
import { Average } from "./charts/weeklyAverage.tsx";
import { MarketCap } from "./charts/weeklyMkCap.tsx";
import { Liquidity } from "./charts/weeklyLiquidity.tsx";
export function Weeklies_Container() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const items = [Average, MarketCap, Liquidity];
  function Skip() {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  }
  const CurrentItem = items[currentItemIndex];
  return (
    <div class="flex h-[6.5rem] sm:h-[8rem] p-1 mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
      <div
        onclick={() => Skip()}
        class="absolute z-[2] sm:right-[3px] right-1 top-[50%] translate-y-[-50%]"
      >
        <img
          class="size-[1rem] active:scale-[85%] cursor-pointer vignets contrast-0"
          src="/misc/caretright.svg"
        ></img>
      </div>
      <div class="h-full w-[358px] sm:w-[473px] rounded-lg gap-0 xl:gap-1 bg-blur3 flex flex-col">
        <CurrentItem />
      </div>
    </div>
  );
}
