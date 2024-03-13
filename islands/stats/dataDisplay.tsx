import TokenData from "./tokenData.tsx";
import MarketBar from "./marketBar.tsx";
import ChartIsland from "./chartisland.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function MarketData() {
  if(!IS_BROWSER) return <></>;
  // Function to toggle the visibility of the helpbox
  return (
    <div class="flex flex-col">
        <div class="flex sm:h-[5rem] h-full w-full order-2 sm:order-1 sm:mx-0 mx-auto shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-2">
            <MarketBar />
          </div>
        </div>
        <div class="flex h-[16rem] max-w-[480px] mx-auto  order-1 sm:order-2 shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-[10px]">
            <TokenData />
          </div>
        </div>
        <div class="flex max-h-[50%] mx-[30%] order-3 sm:order-3 shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-[10px]">

      <ChartIsland />

          </div>
        </div>
    </div>
  );
}
