import Spider from "../components/about/spider.tsx";
import Corv from "../components/about/corv.tsx";
import AboutBG from "../components/common/backgrounds/About.tsx";
export default function About() {
  return (
    <>
    <AboutBG />
      <img
        class="absolute sm:opacity-100 opacity-0 -z-10 bottom-0 blur-sm w-[10rem] sm:w-[35rem]"
        src="/misc/dzhv.png"
      >
      </img>
      <div class="h-full sm:h-[90svh] justify-center mt-[0.5rem] flex flex-col items-center">
        <p class="
  unselectable
  mt-[3rem]
  sm:mt-0
  text-[1.4rem]
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  mx-auto
  font-[monospace]
  bg-transparent
  rounded-xl
  px-6
  mb-0
  sm:mb-[1.5rem]">
          An open-source project driven by,
        </p>

        <Spider />
        <Corv />
        
        <p class="
  unselectable
  text-[1.4rem]
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  mx-auto
  font-[monospace]
  py-3
  bg-transparent
  rounded-xl
  px-6
  mt-[1.5rem]">
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
  py-3
  bg-transparent
  rounded-xl
  px-6
  mt-[0.1rem]">
          Built with machine code, Deno Fresh/KV & Tailwind.
        </p>
      </div>
    </>
  );
}
