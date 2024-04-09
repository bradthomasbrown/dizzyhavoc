import { useState, useEffect } from 'preact/hooks';
import Stars from "../../components/index/LandingElements/Animations/Stars.tsx";
import Vertigo from "../../components/index/LandingElements/ScreenItems/Vertigo.tsx";
import Mayhem from "../../components/index/LandingElements/ScreenItems/Mayhem.tsx";

const items = [Vertigo, Mayhem];

export default function Screen() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const CurrentItem = items[currentItemIndex];

  return (
    <div className="h-[65%] w-[99%] sm:mt-5 mt-0">
      <div className="h-[90%] relative sm:w-[75%] w-full sm:mt-2 mt-0 sm:p-5 p-0 justify-center mx-auto overflow-hidden rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4">
        <CurrentItem />
        <Stars />
      </div>
    </div>
  );
}