import { Container } from "./Info/1/Container.tsx";
import { Container2 } from "./Info/2/Container.tsx";
import { Container3 } from "./Info/3/Container.tsx";
import { ScrollTop } from "../../islands/index/scrollTop.tsx";
export function Info() {
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
      <div class="w-full justify-center gap-y-5 sm:gap-y-[8rem] flex flex-col items-center">
        <Container />
        <Container2 />
        <Container3 />
        <div class="my-[3rem]">
          <ScrollTop />
        </div>
      </div>
    </>
  );
}
