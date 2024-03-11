import MenuButton from "../islands/menuButton.tsx";
import Roadmap from "../components/Roadmap.tsx";
import Roadmap2 from "../components/Roadmap2.tsx";
export default function Ecosystem() {
  return (
    <>

      <div class="sm:min-h-[4rem] min-h-[6.5rem] w-full sm:bg-transparent dark:sm:bg-transparent dark:bg-[#282828bc] bg-[#dbdbdbaa] sm:w-[45rem] justify-center mx-auto items-center px-4 flex  border-e-transparent border-s-transparent border-t-transparent dark:border-e-transparent dark:border-s-transparent dark:border-t-transparent dark:border-[#5e5e5e4d] border-[#dbdbdb] border">
        <div class="justify-start w-full flex">
          <div class="lg:text-[1.8rem] unselectable sm:text-nowrap text-wrap my-auto justify-center text-[1.3rem] font-[Poppins] font-medium  z-10 font-Poppins dark:text-[#d2d2d2]  text-[#282828]">
            Dizzy Havoc/ Roadmap
          </div>
        </div>
        <div class="justify-end w-full flex">
          <MenuButton/>
        </div>
      </div>
      <div class="">
        <Roadmap />
        <Roadmap2/>
      </div>
    </>
  );
}
