import { useState } from "preact/hooks";
import { Omniweekly } from "./charts/mod.ts"
export function Weeklies_Container() {
  const [index, setindex] = useState(0);
  const items = ["averageprice", "marketcap", "liq"];
  const names = ["Average Price", "Market Cap", "Liquidity"];
  function Skip() {
    setindex((prevIndex) => (prevIndex + 1) % items.length);
  }
  return (
    <div class="flex h-[6.5rem] sm:h-[8rem] p-1 mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
      <div
        onClick={() => Skip()}
        class="absolute z-[2] sm:right-[3px] right-1 top-[50%] translate-y-[-50%]"
      >
        <img
          class="size-[1rem] active:scale-[85%] cursor-pointer vignets contrast-0"
          src="/misc/caretright.svg"
        ></img>
      </div>
      <div class="h-full w-[358px] sm:w-[473px] rounded-lg gap-0 xl:gap-1 bg-blur3 flex flex-col">
        <Omniweekly key={items[index]} name={names[index]} type={items[index]}  />
      </div>
    </div>
  );
}