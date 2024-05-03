import Screen from "../../islands/index/Screen.tsx";
import { Tagline } from "./Landing/Tagline.tsx";
import { Explore } from "./Landing/Explore.tsx";
import LandingBG from "../common/backgrounds/Landing.tsx";
export function Landing() {
  return (
    <div>
      <div class="flex flex-row h-screen w-full justify-center items-center">
        <LandingBG />
        <div class="flex flex-row relative">
          <div>
              <Tagline />
              <Explore />
          </div>
          <div class="left-[54rem] size-[11rem] absolute">
            <Screen />
          </div>
        </div>
        {/* <Screen /> */}
      </div>
    </div>
  );
}
