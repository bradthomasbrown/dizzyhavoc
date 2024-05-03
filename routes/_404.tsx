import { Noise } from "../components/common/backgrounds/Noise.tsx";
export default function Error404() {
  return (
    <>
    {/* <div class="h-[20%]">      <Noise /></div> */}

      <div class="h-full flex flex-col justify-center items-center">
        <img
          class="invert-0 dark:invert mt-[10%]"
          src="/misc/1.gif"
          alt="404 image"
          width="450"
        />
        <h1 class="sm:text-4xl text-2xl dark:text-[#d2d2d2] text-[#282828] font-bold">
          404 - Page not found
        </h1>
        <p class="my-4 dark:text-[#d2d2d2] text-[#282828]">
          The page you were looking for doesn't exist.
        </p>
        <div class="flex flew-row gap-x-6">
        <a href="/" class="underline dark:text-[#d2d2d2] text-[#282828] mb-[10%]">
          home
        </a>
        <a href="/stats" class="underline dark:text-[#d2d2d2] text-[#282828] mb-[10%]">
          stats
        </a>
        <a href="/about" class="underline dark:text-[#d2d2d2] text-[#282828] mb-[10%]">
          about
        </a>
        <p class="dark:text-[#d2d2d2] text-[#282828]">|</p>
        <a href="/explore" class="underline dark:text-[#d2d2d2] text-[#282828] mb-[10%]">
          explore
        </a>
        <a href="/roadmap" class="underline dark:text-[#d2d2d2] text-[#282828] mb-[10%]">
          roadmap
        </a>
        </div>
      </div>
    </>
  );
}
