import { Socials } from "../components/common/Socials.tsx";
import { Landing } from "../components/index/Landing.tsx";
export default function Home() {
  return (
    <>
      <div class="h-[90svh] flex">
        <div class="w-full h-full">
          <Landing />
        </div>
        <div class="absolute lg:top-4 top-[4.7rem] z-20 left-1 sm:left-4">
        <Socials />
        </div>
      </div>
    </>
  );
}
