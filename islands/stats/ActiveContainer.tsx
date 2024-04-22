import TokenSummary from "./tokenSummary.tsx";
import MarketBarsContainer from "./MarketBarsContainer.tsx";
// import { Liquidity } from "./charts/weeklyLiquidity.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function ActiveContainer() {
  if (!IS_BROWSER) return <></>;
  return (
    <div class="flex w-full mt-[1rem] mx-auto sm:w-[42rem] flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
        <div class="w-full p-1">
          <TokenSummary />
        </div>
      </div>
      {/* <Liquidity/> */}
      <div class="flex sm:h-[46.5rem] mt-[0.3rem] h-full w-full sm:mx-0 mx-auto shadow-[0_0_15px_0_rgba(0,0,0,0.07)] rounded-xl bg-blur2">
        <div class="w-full p-1">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
