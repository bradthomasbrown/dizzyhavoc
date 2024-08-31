import MenuButton from "../common/menuButton.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export default function NavBar() {
    if(!IS_BROWSER) return <></>;
  return (
    <div id="navbar" class="sm:min-h-[4rem] min-h-[4.5rem] w-full sm:bg-transparent dark:sm:bg-transparent dark:bg-[#2828283f] bg-[#dbdbdb3f] sm:w-[45rem] justify-center mx-auto items-center px-4 flex border-e-transparent border-s-transparent border-t-transparent dark:border-e-transparent dark:border-s-transparent dark:border-t-transparent dark:border-[#5e5e5e4d] border-[#dbdbdb] border">
      <div class="justify-start w-full flex">
        <div class="lg:text-[1.8rem] tracking-tight unselectable text-nowrap sm:gap-2 gap-1 items-center flex justify-center text-[1.5rem] font-[Poppins] font-medium z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">
          <a draggable={false} href="/">
          <img
            draggable={false}
            src="/misc/token.png"
            className="lg:max-w-[50px] max-w-[35px] flex hover:scale-[105%]"
          ></img></a>
          DizzyHavoc
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
