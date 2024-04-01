import Available from "./AvailableOn.tsx";
import Pair1 from "../index/InfoContent/Pair1.tsx";
import Pair2 from "../index/InfoContent/Pair2.tsx";
import Pair3 from "../index/InfoContent/Pair3.tsx";
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
  sm:mt-[0.5rem]
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
      <div class="w-full">
        <Pair1 />
        <Pair2 />
        <Pair3 />
        <div class="flex scale-75 mx-auto justify-center sm:mt-0 bottom-5">
          <Available />
        </div>
      </div>
    </>
  );
}
