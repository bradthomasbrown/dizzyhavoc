import TokenData from "./tokendata.tsx";
import MarketBar from "./MarketBar.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function MarketData() {
  if (!IS_BROWSER) return <></>;
  return (
    <div class="flex w-full mx-auto sm:w-[42rem] flex-col">
      <div class="flex h-[8rem] mx-auto justify-center max-w-[480px] shadow-lg rounded-xl bg-blur2">
        <div class="w-full p-2">
          <TokenData />
        </div>
      </div>
      <div class="flex sm:h-[47rem] h-full w-full sm:mx-0 mx-auto shadow-lg rounded-xl bg-blur2">
        <div class="w-full p-2">
          <MarketBar />
        </div>
      </div>
    </div>
  );
}
