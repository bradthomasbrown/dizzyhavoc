import Info from "../components/Info.tsx";
import Roadmap from "../components/Roadmap.tsx";
import Buy from "../islands/Buy.tsx";
import MenuButton from "../islands/menuButton.tsx";
import Animated from "../components/Animated.tsx";

export default function Home() {

  return (
    <>
      <div class="sm:min-h-[4rem] min-h-[6.5rem] w-full sm:bg-transparent dark:sm:bg-transparent dark:bg-[#282828bc]  bg-[#dbdbdbaa] sm:w-[40rem] justify-center mx-auto items-center px-4 flex  border-e-transparent border-s-transparent border-t-transparent dark:border-e-transparent dark:border-s-transparent dark:border-t-transparent dark:border-[#5e5e5e4d] border-[#dbdbdb] border">
        <div class="justify-start w-full flex">
          <div class="lg:text-[1.8rem] unselectable my-auto justify-center text-[1.5rem] font-[Poppins] font-medium  z-10 font-Poppins dark:text-[#d2d2d2]  text-[#282828]">
            Dizzy Havoc
          </div>
        </div>
        <div class="justify-end w-full flex">
          <div>
          <MenuButton/>
          </div>
        </div>
      </div>
      <div class="w-full h-full flex justify-center divcontainer">
        <div class="flex w-full flex-col items-center">
          <Animated/>
          <div class="flex flex-col gap-3 px-3">
          <div class="Info">
            <Info />
            </div>
            <div class="mt-[10rem] Roadmap">
            <Roadmap />
            </div>
          </div>
        </div>
        <div class="absolute lg:top-4 top-[6.8rem] z-20 left-1 sm:left-4">
        <a
            class="bottom-0"
            target="_blank"
            href="https://linktr.ee/dizzyhavoc"
          >
        <div
              className="text-lg text-[#3d3d3d] dark:text-[#d2d2d2] dark:bg-[#191919] text-center w-[100px] shadow-md dark:shadow-[#bfbfbf04] shadow-[#e9e9e9] font-[Poppins] rounded-lg hover:scale-[105%] dark:border-[#d2d2d228] border z-20 border-[#e9e9e9] cursor-pointer bg-[#f1f1f1]"
            >
            🌐Socials
            </div>
            </a>
        </div>
        <div class="absolute lg:top-4 top-[6.5rem] right-1 sm:right-4">
        <a

          >
        <img src="/token.png"
              className="lg:size-[55px] lg:visible invisible  hover:scale-[105%] cursor-pointer"
            >
            </img>
            </a>
        </div>
        <img
          className="absolute hidden top-0 z-[-10] right-0 w-[25%]"
          src="/dzhv.png"
          alt="dizzyhavoc eye"
        ></img>
      </div>
      <div class="flex mt-[10rem] flex-col gap-3 px-3 xl:flex-row Buy">
        <Buy />
      </div>
    </>
  );
}
