import { useState } from "preact/hooks";
import { Omniweekly } from "./charts/mod.ts"
export function Weeklies_Container() {
  const [index, setindex] = useState(0);
  const items = ["averageprice", "marketcap", "liq", "volume"];
  const names = ["Average Price", "Market Cap", "Liquidity", "Volume"];
  function Skip() {
    setindex((prevIndex) => (prevIndex + 1) % items.length);
  }
  return (
    <div class="flex relative h-[6.5rem] sm:h-[8rem] mx-auto justify-center sm:w-[473px] w-[358px]">
      <div
        onClick={() => Skip()}
        class="absolute z-[2] sm:right-[3px] right-1 top-[50%] translate-y-[-50%]"
      >
        <img
          class="size-[1rem] active:scale-[85%] cursor-pointer vignets contrast-0"
          src="/svgs/caretright.svg"
        ></img>
      </div>
      <div class="h-full border-[2px] border-[#bababa5c] dark:border-[#3636365e] w-[358px] sm:w-[473px] rounded-lg bg-blur3 flex flex-col">
        <Omniweekly key={items[index]} name={names[index]} type={items[index]}  />
      </div>
    </div>
  );
}