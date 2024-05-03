import Screen from "../../islands/index/Screen.tsx";
import { Tagline } from "./Landing/Tagline.tsx";
import { Explore } from "./Landing/Explore.tsx";
import { Noise } from "../common/backgrounds/Noise.tsx";
export function Landing() {
  return (
    <div>
      <div class="flex flex-row h-screen w-full justify-center items-center">
        <Noise />
        <div class="flex flex-row">
          <div class="sm:left-0 left-3 ">
              <Tagline />
              <Explore />
          </div>
          <div class="size-[11rem]">
            <Screen />
          </div>
        </div>
        {/* <Screen /> */}
      </div>
    </div>
  );
}
