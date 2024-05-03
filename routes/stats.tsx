import ActiveContainer from "../islands/stats/ActiveContainer.tsx";
import { Noise } from "../components/common/backgrounds/Noise.tsx";
export default function Stats() {
  return (
    <div class="h-full">
      {/* <Noise /> */}
      <p class="my-[1rem]
  font-medium
  sm:text-[1.7rem]
  text-[1.4rem]
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[Poppins]
  bg-transparent
  lg:max-w-[32rem]
  max-w-full
  rounded-xl">
      Ecosystem Analytics
      </p>
      <ActiveContainer />
    </div>
  );
}
