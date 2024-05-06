import { Noise } from "../common/backgrounds/Noise.tsx";
import { Tagline } from "./Landing/Tagline.tsx";
import { Explore } from "./Landing/Explore.tsx";
import { Carousel } from "../../islands/index/Carousel.tsx";
export function Landing() {
  return (
    <div>
      <div class="flex flex-row h-screen w-full justify-center items-center">
        <Noise />
        <div class="flex flex-row gap-x-[0rem] sm:gap-x-[4rem]">
          <div class="ml-3 sm:ml-0 sm:w-[80%] w-[65%] text-clip sm:text-nowrap text-start">
            <Tagline />
            <Explore />
          </div>
          <div class="sm:size-[130px] size-[100px]">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
