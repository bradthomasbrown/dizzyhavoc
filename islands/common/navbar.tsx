import MenuButton from "../common/menuButton.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function NavBar() {
    if(!IS_BROWSER) return <></>;
  return (
    <div class="sm:min-h-[4rem] min-h-[6.5rem] w-full sm:bg-transparent dark:sm:bg-transparent dark:bg-[#282828bc] bg-[#dbdbdbaa] sm:w-[45rem] justify-center mx-auto items-center px-4 flex  border-e-transparent border-s-transparent border-t-transparent dark:border-e-transparent dark:border-s-transparent dark:border-t-transparent dark:border-[#5e5e5e4d] border-[#dbdbdb] border">
      <div class="justify-start w-full flex">
        <div class="lg:text-[1.8rem] unselectable gap-2 items-center flex justify-center text-[1.5rem] font-[Poppins] font-medium  z-10 font-Poppins dark:text-[#d2d2d2]  text-[#282828]">
          <img
            src="/token.png"
            className="lg:size-[50px] size-[0px] flex hover:scale-[105%]"
          ></img>
          DizzyHavoc/ Beta
        </div>
      </div>
      <div class="justify-end w-full flex">
        <div>
          <MenuButton />
        </div>
      </div>
    </div>
  );
}
