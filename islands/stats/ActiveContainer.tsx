import TokenSummary from "./tokenSummary.tsx";
import MarketBarsContainer from "./MarketBarsContainer.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function ActiveContainer() {
  if (!IS_BROWSER) return <></>;
  return (
    <div class="flex w-full mt-[1rem] mx-auto sm:w-[42rem] flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[480px] w-[366px] shadow-lg bg-blur2 rounded-xl">
        <div class="w-full p-2">
          <TokenSummary />
        </div>
      </div>
      <div class="flex sm:h-[48rem] mt-[0.3rem] h-full w-full sm:mx-0 mx-auto shadow-lg rounded-xl bg-blur2">
        <div class="w-full p-2">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
