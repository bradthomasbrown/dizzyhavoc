import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Stars from "../../components/index/LandingElements/Animations/Stars.tsx";
import Vertigo from "../../components/index/LandingElements/ScreenItems/Vertigo.tsx";
import Mayhem from "../../components/index/LandingElements/ScreenItems/Mayhem.tsx";

const items = [Vertigo, Mayhem];

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
    <div className="h-full sm:h-[30rem] w-full sm:mt-5 mt-0">
      <div
        onClick={handleScreenClick}
        className="sm:min-h-[30rem] sm:max-h-[45rem] min-h-[60svh] max-h-[60svh] relative xl:w-[70%] w-full sm:mt-2 mt-0 sm:p-5 p-0 justify-center mx-auto overflow-hidden rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4"
      >
        {loadingbar}
        <p class="font-medium font-[Poppins] italic absolute top-0 left-0 m-5 unselectable w-full tracking-tighter text-[0.8rem] sm:text-[1.7rem] text-start dark:text-[#969696cc] text-[#636363cc]">
            DeFi user or developer? We provide useful tools for everyone.
          </p>
        <CurrentItem />
        <Stars />
      </div>
    </div>
  );
}
