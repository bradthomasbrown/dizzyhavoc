import TokenData from "./tokendata.tsx";
import MarketBar from "./MarketBar.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function MarketData() {
  if (!IS_BROWSER) return <></>;
  return (
    <div class="flex w-full mx-auto sm:w-[42rem] flex-col">
      <div class="flex h-[6rem] sm:h-[8rem] mx-auto justify-center max-w-[480px] shadow-lg bg-blur2 rounded-xl">
        <div class="w-full p-2">
          <TokenData />
        </div>
      </div>
      <div class="flex sm:h-[48rem] mt-0 sm:mt-[0.3rem] h-full w-full sm:mx-0 mx-auto shadow-lg rounded-xl bg-blur2">
        <div class="w-full p-2">
          <MarketBar />
        </div>
      </div>
    </div>
  );
}
