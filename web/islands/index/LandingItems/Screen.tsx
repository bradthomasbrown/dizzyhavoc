import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  Vertigo,
  Mayhem,
  Gamefi,
  // Factory,
} from "../../../components/index/Landing/ScreenItems/mod.ts";
import {
  Vertigo_img,
  Mayhem_img,
  Gamefi_img,
  // Factory_img,
} from "../../../components/index/Landing/CarouselItems/mod.ts";

const items = [Vertigo, Mayhem, Gamefi];

export function Screen() {
  if (!IS_BROWSER) return null;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [paused, setIsTimerPaused] = useState(false);

  const handleScreenClick = () => {
    setIsTimerPaused((prevIsPaused) => !prevIsPaused);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setTimer((prevTimer) => {
          if (prevTimer >= 100) {
            setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
            return 0;
          } else {
            return prevTimer + 0.1;
          }
        });
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [paused]);

  function Skip(index: number) {
    setCurrentItemIndex(() => index);
    setTimer(0);
  }
  const selectbar = (
    <div class="flex flex-row translate-y-[3.5rem] relative justify-center">
      <div title="Vertigo, the bridge for $DZHV" class="size-[90px] sm:size-[120px] scale-50 hover:scale-[52%] active:scale-[48%] z-[5]" onClick={() => Skip(0)}><Vertigo_img addclass={`cursor-pointer ${currentItemIndex === 0 ? "scale-[1.3]" : ""}`}/></div>
      <div title="Mayhem, the new optimized and opensource Web3 library." class="size-[90px] sm:size-[120px] scale-50 hover:scale-[52%] active:scale-[48%] z-[5]" onClick={() => Skip(1)}><Mayhem_img addclass={`cursor-pointer ${currentItemIndex === 1 ? "scale-[1.3]" : ""}`}/></div>
      <div title="Gamefi features, coming soon." class="size-[90px] sm:size-[120px] scale-50 hover:scale-[52%] active:scale-[48%] z-[5]" onClick={() => Skip(2)}><Gamefi_img addclass={`cursor-pointer ${currentItemIndex === 2 ? "scale-[1.3]" : ""}`}/></div>
      {/* <div title="The Factory, an idea that will soon be developed." class="size-[90px] sm:size-[120px] scale-50 hover:scale-[52%] active:scale-[48%]" onClick={() => Skip(3)}><Factory_img addclass={`cursor-pointer ${currentItemIndex === 3 ? "scale-[1.3]" : ""}`}/></div> */}
      <div className="trapeze w-[calc(100vw-4rem)] absolute sm:bottom-3 bottom-0 sm:w-[25vw] z-[-1] h-[50px] shadow-lg"></div>
    </div>
  )
  const CurrentItem = items[currentItemIndex];
  const loadingbar = (
    <div class="bottom-2 absolute px-4 items-center justify-center rounded-xl h-[1px] w-full">
      <div
        class="h-[3px] bg-gradient-to-r from-transparent via-[#9b9b9b4f] to-[#9b9b9b] dark:bg-gradient-to-r dark:from-transparent dark:to-[#565656] rounded-xl"
        style={`width: ${timer}%`}
      ></div>
    </div>
  );
  return (
    <div className="w-full h-full flex flex-row sm:mt-6 mt-0 relative">
      <div
        onClick={() => handleScreenClick()}
        className="sm:min-h-[70%] sm:max-h-[70%] slidein min-h-[85svh] max-h-[85svh] relative sm:w-[70%] w-full justify-center mx-auto overflow-hidden rounded-lg shadow-inner dark:shadow-none shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4"
      >
        {loadingbar}
        <CurrentItem />
        <div class="absolute bottom-2 right-2">
          {paused?  <img class="size-[25px] sm:size-[35px] contrast-0 invert-0 dark:invert" src="./svgs/pause.svg"></img> : null}
        </div>
      </div>
      <div class="absolute bg-red-500 flex items-center justify-center h-[0px] z-[10] bottom-[28%] left-[50%] translate-x-[-50%]">
      {selectbar}
      </div>
    </div>
  );
}
