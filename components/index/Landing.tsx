import Screen from "../../islands/index/Screen.tsx";
import { Tagline } from "./Landing/Tagline.tsx";
import { Explore } from "./Landing/Explore.tsx";
import { Noise } from "../common/backgrounds/Noise.tsx";
export function Landing() {
  return (
    <div>
      <div class="flex flex-row h-screen w-full justify-center items-center">
        <Noise />
        <div class="sm:left-0 left-3 flex flex-row relative">
          <div>
              <Tagline />
              <Explore />
          </div>
          <div class="sm:left-[54rem] left-[15rem] size-[11rem] bottom-0 absolute">
            <Screen />
          </div>
        </div>
        {/* <Screen /> */}
      </div>
    </div>
  );
}
