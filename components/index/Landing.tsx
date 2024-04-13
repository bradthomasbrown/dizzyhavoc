import Screen from "../../islands/index/Screen.tsx";
import Tagline from "../index/LandingElements/Tagline.tsx";
import LandingBG from "../common/backgrounds/Landing.tsx";
export default function Landing() {
  return (
    <div>
      <div class="flex relative flex-col h-screen justify-center items-center">
        <LandingBG />
        <Tagline />
        <Screen />
      </div>
    </div>
  );
}
