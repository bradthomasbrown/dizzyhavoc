import MenuButton from "../islands/menuButton.tsx";

export default function Error404() {
  return (
    <>
      <div class="sm:min-h-[4rem] min-h-[6.5rem] w-full sm:bg-transparent dark:sm:bg-transparent dark:bg-[#282828bc] bg-[#dbdbdbaa] sm:w-[45rem] justify-center mx-auto items-center px-4 flex  border-e-transparent border-s-transparent border-t-transparent dark:border-e-transparent dark:border-s-transparent dark:border-t-transparent dark:border-[#5e5e5e4d] border-[#dbdbdb] border">
        <div class="justify-start w-full flex">
          <div class="lg:text-[1.8rem] unselectable my-auto justify-center text-[1.5rem] font-[Poppins] font-medium  z-10 font-Poppins dark:text-[#d2d2d2]  text-[#282828]">
            Dizzy Havoc/ 404
          </div>
        </div>
        <div class="justify-end w-full flex">
          <div>
          <MenuButton/>
          </div>
        </div>
      </div>
      <div class="h-screen flex flex-col justify-center items-center">
    <img class="invert-0 dark:invert" src="1.gif" alt="404 image" width="550" />
    <h1 class="text-4xl dark:text-[#d2d2d2] text-[#282828] font-bold">404 - Page not found</h1>
    <p class="my-4 dark:text-[#d2d2d2] text-[#282828]">The page you were looking for doesn't exist.</p>
    <a href="/" class="underline dark:text-[#d2d2d2] text-[#282828]">Go back home</a>
</div>

    </>
  );
}
