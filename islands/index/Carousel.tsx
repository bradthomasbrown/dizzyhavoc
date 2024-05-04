import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Vertigo, Mayhem, Gamefi, Factory } from "../../components/index/Landing/ScreenItems/mod.ts";

const items = [Vertigo, Mayhem, Gamefi, Factory]; // Add more screen items here

export function Carousel() {
  if (!IS_BROWSER) return null;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % items.length);
    }, 5600);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const CurrentItem = items[index];
  return (
    <div className="relative size-full overflow-hidden">
      <CurrentItem />
    </div>
  );
}