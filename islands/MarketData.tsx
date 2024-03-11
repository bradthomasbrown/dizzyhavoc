import TokenData from "./tokendata.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function MarketData() {
  if(!IS_BROWSER) return <></>;
  // Function to toggle the visibility of the helpbox
  return (
    <>
      <div class="w-full h-screen">
        <div class="flex h-[30rem] shadow-lg rounded-xl bg-blur2">
          <div class="w-full p-4 sm:p-9">
            <TokenData />
          </div>
        </div>
      </div>
    </>
  );
}
