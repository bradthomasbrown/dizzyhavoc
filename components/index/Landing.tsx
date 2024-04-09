import Screen from "../../islands/index/Screen.tsx";
import Tagline from "./LandingElements/Tagline.tsx"
export default function Landing() {
  return (
    <div>
      <div class="flex flex-col h-screen items-center">
        <Screen />
        <Tagline />
      </div>
    </div>
  );
}
