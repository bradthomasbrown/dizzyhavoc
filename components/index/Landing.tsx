import Screen from "../../islands/index/Screen.tsx";
import AvailableOn from "../index/AvailableOn.tsx";
import Tagline from "../index/LandingElements/Tagline.tsx";
export default function Landing() {
  return (
    <div>
      <div class="flex flex-col h-screen justify-center items-center">
      <Tagline />
        <Screen />
        <div class="sm:scale-[50%] scale-[90%]">
        <AvailableOn />
        </div>
      </div>
    </div>
  );
}
