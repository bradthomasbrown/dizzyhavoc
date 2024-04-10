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
            console.log(prevTimer + 0.1);
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

  return (
    <div className="h-[65%] w-[99%] sm:mt-5 mt-0">
      <div
        onClick={handleScreenClick}
        className="sm:h-[90%] h-[80svh] relative sm:w-[75%] w-full sm:mt-2 mt-0 sm:p-5 p-0 justify-center mx-auto overflow-hidden rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4"
      >
        <div class="bottom-[2px] px-[4px] absolute left-0 bg-blur3 items-center justify-center rounded-xl h-[1px] w-full">
          <div
            class="h-[1px] bg-[#3d3d3d] dark:bg-[#d0d0d0] rounded-xl"
            style={`width: ${timer}%`}
          >
          </div>
        </div>
        <CurrentItem />
        <Stars />
      </div>
    </div>
  );
}
