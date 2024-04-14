import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Stars from "../../components/index/LandingElements/Animations/Stars.tsx";
import AvailableOn from "../../components/index/AvailableOn.tsx";
import { Vertigo, Mayhem, Gamefi, Factory } from "../../components/index/LandingElements/ScreenItems/mod.ts";

const items = [Vertigo, Mayhem, Gamefi, Factory]; // Add more screen items here

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
    <div class="bottom-1 px-[4px] absolute left-0 bg-blur3 items-center justify-center rounded-xl h-[1px] w-full">
      <div
        class="h-[1px] bg-[#3d3d3d] dark:bg-[#d0d0d0] rounded-xl"
        style={`width: ${timer}%`}
      >
      </div>
    </div>
  );
  return (
    <div className="h-full sm:h-[70%] w-full sm:mt-5 mt-0">
      <div
        onClick={() => handleScreenClick()}
        className="sm:min-h-[70%] sm:max-h-[100%] min-h-[60svh] max-h-[60svh] relative xl:w-[70%] w-full sm:mt-2 mt-0 sm:p-5 p-0 justify-center mx-auto overflow-hidden rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4"
      >
        {loadingbar}
        <p class="font-medium font-[Poppins] italic absolute top-0 left-0 m-5 unselectable w-full tracking-tighter text-[0.8rem] sm:text-[1.7rem] text-start dark:text-[#969696cc] text-[#636363cc]">
          DeFi user or developer? We provide useful tools for everyone.
        </p>
        <CurrentItem />
        <Stars />
        <div
          id="skip"
          class="font-medium z-50 font-[Poppins] m-5 active:scale-[98%] absolute cursor-pointer unselectable bottom-0 left-0 tracking-tighter text-[0.8rem] sm:text-[1.7rem] text-start dark:text-[#969696cc] text-[#636363cc]"
          onClick={Skip}
          onClickCapture={handleScreenClick} // 🤔
        >
          <img src="/misc/arrowright.svg" draggable={false} class="dark:invert invert-0 contrast-50 scale-[1.7]"/>
        </div>
      </div>
      <div class="sm:scale-[50%] scale-[80%]">
        <AvailableOn />
        </div>
    </div>
  );
}
