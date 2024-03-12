import TokenData from "./tokendata.tsx";
import MarketBar from "./MarketBar.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function MarketData() {
  if(!IS_BROWSER) return <></>;
  // Function to toggle the visibility of the helpbox
  return (
    <div class="flex  flex-col">
        <div class="flex sm:h-[5rem] h-full max-w-full order-2 sm:order-1 sm:mx-0 mx-auto shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-2">
            <MarketBar />
          </div>
        </div>
        <div class="flex h-[16rem] mt-0 sm:mt-[4%] max-w-[480px] order-1 sm:order-2 mx-auto shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-[10px]">
            <TokenData />
          </div>
        </div>
    </div>
  );
}
