import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Vertigo_img, Mayhem_img, Gamefi_img, Factory_img } from "../../../components/index/Landing/CarouselItems/mod.ts";

const items = [Vertigo_img, Mayhem_img, Gamefi_img, Factory_img]; // Add more screen items here

export function Carousel() {
  if (!IS_BROWSER) return null;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % items.length);
    }, 3400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const CurrentItem = items[index];
  return (
    <div className="relative size-full overflow-hidden">
      <CurrentItem addclass="slidefadeout absolute" />
    </div>
  );
}