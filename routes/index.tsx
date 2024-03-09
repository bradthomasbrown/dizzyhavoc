import Info from "../components/Info.tsx";
import Roadmap from "../components/Roadmap.tsx";
import Buy from "../components/Buy.tsx";
import MenuButton from "../islands/menuButton.tsx";

export default function Home() {

  return (
    <>
      <div class="absolute h-[100%] border-[#595959] border-2 border-t-transparent border-e-transparent border-s-transparent w-full overflow-hidden -z-10 top-0">
    <div class="opacity-25 sm:opacity-100" id="stars-container">
			<div id='stars'></div>
			<div id='stars2'></div>
			<div id='stars3'></div>
</div>
<section2 class="">
  <div class='air air1'></div>
  <div class='air air2'></div>
  <div class='air air3'></div>
  <div class='air air4'></div>
</section2>
    </div>
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
      <div class="w-full xl:mt-[25rem] mt-[6rem] h-full flex justify-center divcontainer">
        <div class="flex w-full flex-col items-center">
   
          {/* <div class="h-full absolute top-[1rem] lg:top-[55rem] min-w-full">
          <div
            className="w-full z-[10] shadow-xl"
          >
            <p class="font-medium font-[Poppins] z-10 w-full tracking-tighter -top-5 italic absolute text-[1.7rem] sm:text-[2rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d] px-2">
              Upgradeable, machine-coded*, multi-chain, DeFi/GameFi ecosystem.
            </p>
          </div>
          <div
            className="trapeze invisible  sm:visible sm:max-w-[63rem] max-w-[70%] mx-auto z-[-10] shadow-lg"
            id="trapeze"
          ></div>
          </div> */}
           <p class="font-medium unselectable mt-[0rem] font-[Poppins] z-10 tracking-tighter italic absolute text-[1.6rem] sm:text-[2.5rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d]">
              Upgradeable, machine-coded*, multi-chain, DeFi/GameFi ecosystem.
            </p>
            <div class="cursor-pointer hover:scale-[105%] font-medium sm:mt-[8rem] invisible xl:visible mt-[8rem] font-[Poppins] z-10 tracking-tighter italic absolute text-[1.4rem] sm:text-[2rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d]">Learn more</div>
          <div class="flex flex-col mx-auto justify-center gap-3 px-3">
         
          <div class="sm:mt-[50%] mt-[12rem] Info">
            <Info />
            </div>
            <div class="sm:mt-[8rem] mt-[2rem] Roadmap">
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
