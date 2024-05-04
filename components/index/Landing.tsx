import { Noise } from "../common/backgrounds/Noise.tsx";
import { Tagline } from "./Landing/Tagline.tsx";
import { Explore } from "./Landing/Explore.tsx";
import { Carousel } from "../../islands/index/Carousel.tsx";
export function Landing() {
  return (
    <div>
      <div class="flex flex-row h-screen w-full justify-center items-center">
        <Noise />
        <div class="flex flex-row gap-x-[2rem]">
          <div class="sm:left-0 left-3 ">
            <Tagline />
            <Explore />
          </div>
          <div class="sm:size-[130px] size-[110px]">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}
