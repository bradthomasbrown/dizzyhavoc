import Spider from "../components/about/spider.tsx";
import Corv from "../components/about/corv.tsx";
import { Noise } from "../components/common/backgrounds/Noise.tsx";
export default function About() {
  return (
    <>
        <div class="h-full top-0"><Noise /></div>
      <img
        class="absolute vignets sm:opacity-100 opacity-0 -z-10 bottom-0 blur-sm w-[10rem] sm:w-[35rem]"
        src="/misc/dzhv.png"
      >
      </img>
      <div class="h-screen sm:h-[90svh] justify-center mt-[0.5rem] flex flex-col items-center">
        <p class="mb-[0.5rem]
  font-medium
  text-[1.35rem]
  sm:text-[1.7rem]
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[Poppins]
  mt-[1rem]">
          An open-source project driven by,
        </p>
        <div class="flex sm:p-11 p-3 flex-col items-start justify-start">
        <Spider />
        <Corv />
        </div>
        <p class="mb-[0.5rem]
  font-medium
  text-[1.35rem]
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[Poppins]
  mt-[2rem]
  bg-transparent
  lg:min-w-[32rem]
  min-w-full
  rounded-xl">
          And all the Discord, Github & Telegram contributors.
        </p>
        <p class="
  unselectable
  text-[0.9rem]
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  mx-auto
  font-[monospace]
  bg-transparent
  rounded-xl
  px-6
  mt-[0.1rem]">
          Built with machine code, TypeScript, Deno Fresh/KV & Tailwind.
        </p>
      </div>
    </>
  );
}
