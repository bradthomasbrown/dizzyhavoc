import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { Summary } from "./Summary.tsx";
import { Average } from "./charts/weeklyAverage.tsx";
import { MarketCap } from "./charts/weeklyMkCap.tsx";
import { Liquidity } from "./charts/weeklyLiquidity.tsx";
import { MarketBarsContainer } from "./MarketBarsContainer.tsx";
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
        <div class="flex vignets h-[6.5rem] sm:h-[8rem] p-1 mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
          <div
            onclick={() => Skip()}
            class="absolute z-[2] sm:right-[3px] right-1 top-[50%] translate-y-[-50%]"
          >
            <img
              class="size-[1rem] active:scale-[85%] cursor-pointer vignets contrast-0"
              src="/misc/caretright.svg"
            ></img>
          </div>
          <div class="shadow-lg h-full w-[358px] sm:w-[473px] vignets rounded-lg gap-0 xl:gap-1 bg-blur3 flex flex-col">
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
