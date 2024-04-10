import { useState, useEffect } from 'preact/hooks';
import { IS_BROWSER } from "$fresh/runtime.ts";
import Stars from "../../components/index/LandingElements/Animations/Stars.tsx";
import Vertigo from "../../components/index/LandingElements/ScreenItems/Vertigo.tsx";
import Mayhem from "../../components/index/LandingElements/ScreenItems/Mayhem.tsx";

const items = [Vertigo, Mayhem];

export default function Screen() {
  
  if (!IS_BROWSER) return null;
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer == 0) {
          setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
          return 10; // Reset to 10seconds when timer reaches 0
        } else {
          return prevTimer - 1;
        }
      })
    }, 1000); // cycle every second
    return () => {
      clearInterval(interval);
    };
  }, []);

  const CurrentItem = items[currentItemIndex];

  return (
    <div className="h-[65%] w-[99%] sm:mt-5 mt-0">
      <div className="sm:h-[90%] h-[100svh] relative sm:w-[75%] w-full sm:mt-2 mt-0 sm:p-5 p-0 justify-center mx-auto overflow-hidden rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4">
        <CurrentItem />
        <Stars />
        <div class="text-xl text-[#3d3d3d] dark:text-[#d4d4d4] font-[monospace] bottom-0 absolute">{timer}</div>
 
      </div>
    </div>
  );
}