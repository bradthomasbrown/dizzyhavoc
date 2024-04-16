import Pair1 from "../index/InfoContent/Pair1.tsx";
import Pair2 from "../index/InfoContent/Pair2.tsx";
import Pair3 from "../index/InfoContent/Pair3.tsx";
import AvailableOn from "../index/AvailableOn.tsx";
import ScrollTop from "../../islands/index/scrollTop.tsx";
export default function Info() {
  return (
    <>
      <p
        id="info"
        class="info
  font-medium
  text-[1.7rem]
  unselectable
  sm:text-[2.5rem]
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  mx-auto
  font-[Poppins]
  mt-[2rem]
  sm:mt-[2.5rem]
  py-3
  bg-transparent
  lg:max-w-[32rem]
  max-w-full
  rounded-xl
  px-6
  sm:mb-[3.5rem]
  mb-[1rem]"
      >
        What is DizzyHavoc?
      </p>
      <div class="w-full justify-center flex flex-col items-center">
        <Pair1 />
        <Pair2 />
        <Pair3 />
        <div class="my-[3rem]">
          <ScrollTop />
        </div>
      </div>
    </>
  );
}
