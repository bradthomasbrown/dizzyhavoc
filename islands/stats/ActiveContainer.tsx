import { useSignal } from "@preact/signals";
import { Summary } from "./Summary.tsx";
import { Weeklies_Container } from "./WeekliesContainer.tsx";
import { MarketBarsContainer } from "./MarketBarsContainer.tsx";
export default function ActiveContainer() {
  const toggle = useSignal(false);
  return (
    <div class="flex w-full mt-[1rem] mx-auto sm:w-[42rem] sm:gap-y-1 gap-y-2 vignets flex-col">
      <div class="flex h-[4.5rem] sm:h-[5rem] mx-auto justify-center sm:w-[473px] w-[358px] bg-blur2 rounded-xl">
        <div class="w-full z-[5] relative p-1">
          <Summary />
          <div
            class="absolute bottom-1 left-[50%] translate-x-[-50%] z-[3]"
            onClick={() => (toggle.value = !toggle.value)}
          >
            {toggle.value ? (
              <img
                class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                src="/misc/caretup.svg"
              ></img>
            ) : (
              <img
                class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                src="/misc/caretdown.svg"
              ></img>
            )}
          </div>
        </div>
      </div>
      {toggle.value ? <Weeklies_Container /> : null}
      <div class="flex h-full shadow-none sm:shadow-[0_0_15px_0_rgba(0,0,0,0.07)] rounded-xl bg-blur2">
        <div class="w-screen justify-center items-center">
          <MarketBarsContainer />
        </div>
      </div>
    </div>
  );
}
