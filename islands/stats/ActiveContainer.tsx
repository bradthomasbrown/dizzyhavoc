import Summary from "./Summary.tsx";
import MarketBarsContainer from "./MarketBarsContainer.tsx";
export default function ActiveContainer() {
  return (
    <div class="flex w-full mt-[1rem] mx-auto sm:w-[42rem] vignets flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
        <div class="w-full p-1">
          <Summary />
        </div>
      </div>

      <div class="flex mt-[0.3rem] h-full w-full sm:mx-0 mx-auto shadow-none sm:shadow-[0_0_15px_0_rgba(0,0,0,0.07)] rounded-xl bg-blur2">
        <div class="w-full p-1">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
