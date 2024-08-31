import { Noise } from "../components/common/backgrounds/Noise.tsx";
export default function Error404() {
  return (
    <>
        <div class="h-full top-0"><Noise /></div>

      <div class="h-screen flex flex-col justify-center items-center">
        <img
          class="invert-0 dark:invert sm:w-[450px] w-[250px]"
          src="/misc/1.gif"
          alt="404 image"
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
        <a href="/explore" class="underline dark:text-[#d2d2d2] text-[#282828] mb-[10%]">
          explore
        </a>
        </div>
      </div>
    </>
  );
}
