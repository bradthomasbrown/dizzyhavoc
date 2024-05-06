import { useState } from "preact/hooks";
import { Noise } from "../../components/common/backgrounds/Noise.tsx";
import { Tagline } from "../../components/index/Landing/Tagline.tsx";
import { Explore } from "./Explore.tsx";
import { Carousel } from "./Carousel.tsx";
import { Screen } from "./Screen.tsx";

export function Landing() {
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    setToggle(!toggle);
  }

  return (
    <div>
      <div className="flex flex-row h-screen w-full justify-center items-center">
        <Noise />
        {!toggle ? (
          <div className="flex flex-row gap-x-[0rem] sm:gap-x-[4rem] -translate-y-1/3">
            <div className="ml-3 sm:ml-0 sm:w-[80%] w-[65%] text-clip sm:text-nowrap text-start">
              <Tagline />
              <div className="mt-[1rem] w-[150px] h-[30px] rounded-lg" onClick={toggler}><Explore text="Explore" /></div>
            </div>
            <div className="sm:size-[130px] size-[100px]">
              <Carousel />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 relative">

            <div class="w-[calc(100vw-150px)] h-[35vw]"><Screen /></div>
          
            <div className="w-[150px] h-[30px] rounded-lg absolute bottom-0 left-[50%] translate-x-[-50%]" onClick={toggler}><Explore text="Exit" /></div>
          </div>
        )}
      </div>
    </div>
  );
}