import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Not found</title>
      </Head>
      <div class="px-0 pt-9 mx-auto">
        <div class="max-w-screen-md h-screen mx-auto flex flex-col items-center justify-center">
          <img class="visible dark:invisible" src="1.gif" alt="404 image" width="550" />
          <h1 class="text-4xl dark:text-[#d2d2d2]  text-[#282828] font-bold">404 - Page not found</h1>
          <p class="my-4 dark:text-[#d2d2d2]  text-[#282828]">The page you were looking for doesn't exist.</p>
          <a href="/" class="underline dark:text-[#d2d2d2]  text-[#282828]">
            Go back home
          </a>
        </div>
      </div>
    </>
  );
}
