import Socials from "../components/common/Socials.tsx";
import Landing from "../components/index/Landing.tsx";
import Info from "../components/index/Info.tsx";
export default function Home() {
  return (
    <>
      <div class="w-full h-full flex">
      <div class="absolute lg:top-4 top-[4.7rem] z-20 left-1 sm:left-4">
        <Socials />
        </div>
        <div class="w-full h-full">
          <Landing />
          <Info />
        </div>
      </div>
    </>
  );
}
