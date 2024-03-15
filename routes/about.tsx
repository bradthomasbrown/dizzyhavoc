export default function About() {
  return (
    <>
      <img class="absolute sm:opacity-100 opacity-50 -z-10 bottom-0 blur-sm w-[10rem] sm:w-[35rem]" src="/misc/dzhv.png"></img>
      <div class="h-screen justify-center mt-[-4.5rem] flex flex-col items-center">
      <p
        class="
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
  sm:mb-[1.5rem]"
      >
        An open-source project driven by,
      </p>
      <div class="flex mt-[2rem] flex-row">
        <img class="hover:scale-[101%] size-[90px] sm:size-[120px] rounded-full" src="/misc/spider.png"/>
        <div class="flex mx-5 flex-col">
        <h1 class="text-[1.5rem] font-[Poppins] font-medium z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">Brad Brown</h1>
        <h1 class="text-[1.1rem] font-[Poppins] z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">Creator, Lead developper, Back End</h1>
        <div class="flex flex-row">
        <a target="_blank" href="https://github.com/bradbrown-llc" class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]">github</a>
        <a target="_blank" href="https://twitter.com/dizzyhavoc" class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]">twitter</a>
        <a target="_blank" href="https://discordapp.com/users/1173062401621504063" class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]">discord</a>
        </div>
        </div>
        </div>
        <div class="flex mt-[2rem] flex-row">
        <img class="hover:scale-[101%] size-[70px] sm:size-[100px] rounded-full" src="/misc/corv.jpg"/>
        <div class="flex mx-5 flex-col">
        <h1 class="text-[1.5rem] font-[Poppins] font-medium z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">Corvardt</h1>
        <h1 class="text-[1.1rem] font-[Poppins] z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">Front End</h1>
        <div class="flex flex-row">
        <a target="_blank" href="https://github.com/corvardt" class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]">github</a>
        <a target="_blank" href="https://twitter.com/covardt" class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]">twitter</a>
        <a target="_blank" href="https://discordapp.com/users/209761949066461194" class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]">discord</a>
        </div>
        </div>
        </div>
        <p
        class="
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
  mt-[1.5rem]"
      >
        And all the Discord, Github & Telegram contributors.
      </p>
      <p
        class="
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
  mt-[0.1rem]"
      >
        Built with machine code, Deno Fresh/KV & Tailwind.
      </p>
    </div>
    </>
  );
}
