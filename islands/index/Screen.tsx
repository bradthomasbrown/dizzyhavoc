import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Vertigo, Mayhem, Gamefi } from "../../components/index/Landing/ScreenItems/mod.ts";

const items = [Vertigo, Mayhem, Gamefi]; // Add more screen items here

export default function Screen() {
  if (!IS_BROWSER) return null;
  const [index, setindex] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setTimer((time) => {
          if (time >= 100) {
            setindex((index) => (index + 1) % items.length);
            return 0;
          } else {
            return time + 0.1;
          }
        });
    }, 10);
    return () => {
      clearInterval(interval);
    };
  });

  function Skip() {
    setindex((index) => (index + 1) % items.length);
    setTimer(0);
  }

  const CurrentItem = items[index];
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
    <div className="h-full w-full">
      <div
        className="relative size-full justify-center mx-auto overflow-hidden rounded-lg"
      >
        {loadingbar}
        <CurrentItem />
        <div
          id="skip"
          class="font-medium z-50 font-[Poppins] active:scale-[98%] absolute cursor-pointer unselectable bottom-2 left-2 tracking-tighter text-[0.8rem] sm:text-[1.7rem] text-start dark:text-[#969696cc] text-[#636363cc]"
          onClick={Skip}
        >
          <img src="/misc/caretright.svg" draggable={false} class="sm:size-[25px] size-[20px] contrast-[0.3] invert-0 dark:invert"/>
        </div>
      </div>
    </div>
  );
}
