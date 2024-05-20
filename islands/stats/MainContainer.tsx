import { useSignal } from "@preact/signals";
import { Summary } from "./Summary.tsx";
import { Weeklies_Container } from "./WeekliesContainer.tsx";
import { MarketBarsContainer } from "./MarketBarsContainer.tsx";
export function MainContainer() {
  const toggle = useSignal(false);
  const toggler = (
    <div
    class="absolute bottom-1 left-[50%] translate-x-[-50%] z-[3]"
    onClick={() => (toggle.value = !toggle.value)}
  >
    {toggle.value ? (
      <img
        class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
        src="/svgs/caretup.svg"
      ></img>
    ) : (
      <img
        class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
        src="/svgs/caretdown.svg"
      ></img>
    )}
  </div>
  )
  return (
    <div class="flex w-full min-h-[90svh] mt-[1rem] mx-auto sm:w-[42rem] gap-[6px] flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px]">
        <div class="w-full z-[5] relative">
          <Summary />
          {toggler} {/* toggler for weeklies, on top of summary */}
        </div>
      </div>
      {toggle.value ? <Weeklies_Container /> : null}
      <div class="flex h-full">
        <div class="w-full justify-center items-center">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
