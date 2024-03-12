import TokenData from "./tokendata.tsx";
import MarketBar from "./marketBar.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function MarketData() {
  if(!IS_BROWSER) return <></>;
  // Function to toggle the visibility of the helpbox
  return (
    <>
        <div class="flex sm:h-[6rem] h-full max-w-full  sm:mx-3 mx-auto shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-4">
            <MarketBar />
          </div>
        </div>
        <div class="flex h-[20rem] mt-[4%] max-w-[480px] mx-auto shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-4">
            <TokenData />
          </div>
        </div>
        
    </>
  );
}
