import { useState } from "preact/hooks";
import { Noise } from "../../components/common/backgrounds/Noise.tsx";
import { Tagline } from "../../components/index/Landing/Tagline.tsx";
import { Explore } from "./LandingItems/Explore.tsx";
import { Carousel } from "./LandingItems/Carousel.tsx";
import { Screen } from "./LandingItems/Screen.tsx";
import { FAQ, state } from "./LandingItems/FAQ.tsx";

export function Landing() {
  const [toggle, setToggle] = useState(false);
  const [hidden, sethidden] = useState(false);
  const [read, setread] = useState(false);
  const handleClick = () => {
    sethidden(!hidden);
    setread(true);
  };
  return (
    <div>
      <div
        className={`flex relative flex-row sm:h-screen h-[95svh] w-full justify-center ${
          toggle ? "items-start sm:items-center" : "items-center"
        }`}
      >
        <Noise />
        {!toggle ? ( // Title view
          <div class={`flex flex-col`}>
            <div
              className={`flex flex-row gap-x-[0rem] sm:gap-x-[4rem] -translate-y-1/3 ${
                hidden ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="ml-3 sm:ml-0 sm:w-[80%] w-[65%] text-clip sm:text-nowrap text-start">
                <Tagline />
                <div
                  className="mt-[1rem] w-[150px] h-[30px] rounded-lg"
                  onClick={() => setToggle(!toggle)}
                >
                  <Explore text="Explore" />
                </div>
              </div>
              <div className="sm:size-[130px] size-[100px]">
                <Carousel />
              </div>
            </div>
            <div class="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
            {hidden ? <FAQ /> : null} {/* FAQ view */}
            </div>
            <div class="absolute left-[50%] translate-x-[-50%] sm:bottom-[10%] bottom-[5%]">
              <div
                onClick={() => handleClick()}
                className={`
          ${hidden || read ? "" : "shimmer3"}
          text-md
          sm:text-xl 
          mb-2 
          font-medium 
          font-[Poppins] 
          text-center 
          unselectable 
          w-[250px]
          sm:w-[25vw]
          sm:h-[30px]
          h-[25px]
          cursor-pointer 
          hover:scale-[100.5%] 
          active:scale-[99.5%] 
          border
          border-e-transparent 
          border-s-transparent 
          bg-gradient-to-r
          from-transparent
          dark:from-transparent
          ${!hidden ? "dark:via-[#323232a7] via-[#ffffffa7]" 
          : "dark:via-[#181818] via-[#eeeeee]"}
          to-transparent
          dark:to-transparent
          border-t-[#5e5e5e4d] 
          border-b-[#5e5e5e4d] 
          dark:border-e-transparent 
          dark:border-s-transparent 
          dark:border-t-[#dbdbdb3b]
          dark:border-b-[#dbdbdb3b]
          dark:text-[#cccccc] 
          text-[#3d3d3d]`}
              >
                {!hidden ? "Frequently Asked Questions" : "Close FAQ"} {/* FAQ button */}
              </div>
            </div>
          </div>
        ) : (
          // Screen view
          <div className="flex flex-col gap-y-3 relative">
            <p class="font-[Poppins] font-medium absolute top-[10%] sm:-top-[5%] left-[20%] translate-x-[-50%] z-[5] unselectable tracking-tighter text-[1.7rem] sm:text-[2.4rem] dark:text-[#d2d2d2] text-[#3d3d3d]">
              Featured.
            </p>
            <div class="sm:w-[calc(100vw-120px)] sm:h-[30vw] w-screen h-full">
              <Screen />
            </div>
            <div
              className="w-[110px] sm:w-[160px] h-[35px] sm:h-[40px] rounded-lg absolute translate-y-[6vw] sm:translate-y-[32vw] left-[65%] translate-x-0 sm:left-[50%] sm:translate-x-[-50%]"
              onClick={() => setToggle(!toggle)}
            >
              <Explore text="Close" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
