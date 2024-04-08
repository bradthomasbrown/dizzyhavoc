import Screen from "./LandingElements/Screen.tsx";
import Tagline from "./LandingElements/Tagline.tsx"
export default function Landing() {
  return (
    <div>
      <div class="flex flex-col h-screen items-center border-transparent lg:border-[#93939380] border lg:border-t-transparent lg:border-e-transparent lg:border-s-transparent border-t-transparent border-e-transparent border-s-transparent">
        <Screen />
        <Tagline />
      </div>
    </div>
  );
}
