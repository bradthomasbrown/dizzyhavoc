import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Summary from "./Summary.tsx";
import { Liquidity } from "./charts/weeklyLiquidity.tsx";
import { MarketCap } from "./charts/weeklyMkCap.tsx";
import { Average } from "./charts/weeklyAverage.tsx";
import MarketBarsContainer from "./MarketBarsContainer.tsx";
export default function ActiveContainer() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const toggle = useSignal(false);
  const items = [Average, MarketCap, Liquidity];
  function Skip() {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  }
  const CurrentItem = items[currentItemIndex];
  return (
    <div class="flex w-full mt-[1rem] mx-auto sm:w-[42rem] gap-y-1 vignets flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
        <div class="w-full relative p-1">
          <Summary />
          <div
            class="absolute bottom-1 left-[50%] translate-x-[-50%] z-[3]"
            onClick={() => (toggle.value = !toggle.value)}
          >
            {toggle.value ? (
              <img
                class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                src="/misc/caretup.svg"
              ></img>
            ) : (
              <img
                class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                src="/misc/caretdown.svg"
              ></img>
            )}
          </div>
        </div>
      </div>
      {toggle.value ? (
        <div class="flex vignets h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
          <div
            onclick={() => Skip()}
            class="absolute z-[2] sm:right-[3px] right-1 top-1 sm:top-8"
          >
            <img
              class="size-[1.1rem] cursor-pointer active:scale-[95%] contrast-0"
              src="/misc/arrowright.svg"
            ></img>
          </div>
          <div class="w-full p-1">
            <CurrentItem />
          </div>
        </div>
      ) : null}
      <div class="flex h-full w-full sm:mx-0 mx-auto shadow-none sm:shadow-[0_0_15px_0_rgba(0,0,0,0.07)] rounded-xl bg-blur2">
        <div class="w-full p-1">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
