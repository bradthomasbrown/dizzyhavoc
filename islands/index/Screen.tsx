import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Stars from "../../components/index/Landing/Animations/Stars.tsx";
import AvailableOn from "../../components/index/AvailableOn.tsx";
import { Vertigo, Mayhem, Gamefi } from "../../components/index/Landing/ScreenItems/mod.ts";

const items = [Vertigo, Mayhem, Gamefi]; // Add more screen items here

export default function Screen() {
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

  function Skip() {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    setTimer(0);
  }

  const CurrentItem = items[currentItemIndex];
  const loadingbar = (
    <div class="bottom-2 absolute px-4 items-center justify-center rounded-xl h-[1px] w-full">
      <div
        class="h-[3px] bg-gradient-to-r from-transparent via-[#9b9b9b4f] to-[#9b9b9b] dark:bg-gradient-to-r dark:from-transparent dark:to-[#565656] rounded-xl"
        style={`width: ${timer}%`}
      >
      </div>
    </div>
  );
  return (
    <div className="h-full sm:h-[70%] w-full sm:mt-6 mt-0">
      <div
        onClick={() => handleScreenClick()}
        className="sm:min-h-[70%] sm:max-h-[70%] min-h-[70svh] max-h-[70svh] relative sm:w-[70%] w-full justify-center mx-auto overflow-hidden rounded-lg shadow-inner dark:shadow-none shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4"
      >
        {loadingbar}
        <p class="font-medium font-[Poppins] absolute top-3 left-3 unselectable w-full text-[0.95rem] sm:text-[1.7rem] text-start dark:text-[#969696cc] text-[#636363cc]">
         DeFi user or developer? Explore our network.
        </p>
        <CurrentItem />
        <Stars />
        <div
          id="skip"
          class="font-medium z-50 font-[Poppins] mb-5 active:scale-[98%] absolute cursor-pointer unselectable bottom-0 left-5 tracking-tighter text-[0.8rem] sm:text-[1.7rem] text-start dark:text-[#969696cc] text-[#636363cc]"
          onClick={Skip}
          onClickCapture={handleScreenClick} // 🤔
        >
          <img src="/misc/arrowright.svg" draggable={false} class="dark:invert invert-0 contrast-50 scale-[1.7]"/>
        </div>
      </div>
      <div class="scale-[70%] sm:scale-50">
        <AvailableOn />
        </div>
    </div>
  );
}
