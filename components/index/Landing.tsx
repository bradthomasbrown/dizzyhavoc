import Screen from "../../islands/index/Screen.tsx";
import Tagline from "../index/LandingElements/Tagline.tsx";
export default function Landing() {
  return (
    <div>
      <div class="flex flex-col h-screen justify-center items-center">
      <Tagline />
        <Screen />
      </div>
    </div>
  );
}
