import Screen from "../../islands/index/Screen.tsx";
import Tagline from "../index/LandingElements/Tagline.tsx";
import Background from "../index/Background.tsx";
export default function Landing() {
  return (
    <div>
      <div class="flex relative flex-col h-screen justify-center items-center">
        <Background />
        <Tagline />
        <Screen />
      </div>
    </div>
  );
}
