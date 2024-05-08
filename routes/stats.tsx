import ActiveContainer from "../islands/stats/ActiveContainer.tsx";
import { Noise } from "../components/common/backgrounds/Noise.tsx";
export default function Stats() {
  return (
    <>
      <p
        class="
  mt-[1rem]
  sm:mt-[3rem]
  mb-[1rem]
  font-medium
  sm:text-[1.7rem]
  text-[1.4rem]
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[Poppins]
  lg:max-w-[32rem]
  max-w-full
  rounded-xl
  xl-mt"
      >
        Ecosystem Analytics
      </p>
      <div class="h-full top-0 opacity-50">
        <Noise />
      </div>
      <div class="h-full">
        <div class="">
          <ActiveContainer />
        </div>
      </div>
    </>
  );
}
