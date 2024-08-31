import { MainContainer } from "../islands/stats/MainContainer.tsx";
import { Noise } from "../components/common/backgrounds/Noise.tsx";
export default function Stats() {
  return (
    <>
      <div class="h-full top-0 opacity-50">
        <Noise />
      </div>
      <p
        class="
  mt-[2.5rem]
  sm:text-[1.7rem]
  text-[1.4rem]
  unselectable
  mx-auto
  text-center
  tracking-tight
  dark:text-[#ededed]
  text-[#1c1c1c]
  font-[Poppins]
  lg:max-w-[32rem]
  max-w-full
  rounded-xl
  xl-mt"
      >
        Ecosystem Analytics
      </p>
      <div class="h-full">
        <div>
          <MainContainer />
        </div>
      </div>
    </>
  );
}
