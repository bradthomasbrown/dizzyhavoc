import Available from "../components/AvailableOn.tsx";
export default function Animated() {
  return (
    <>
      <div class="absolute h-[100%] border-transparent sm:border-[#595959] border-2 sm:border-t-transparent sm:border-e-transparent sm:border-s-transparent border-t-transparent border-e-transparent border-s-transparent w-full overflow-hidden -z-10 top-0">
        <div class="opacity-25 sm:opacity-100" id="stars-container">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>
        <section2 class="">
          <div class="air air1"></div>
          <div class="air air2"></div>
          <div class="air air3"></div>
          <div class="air air4"></div>
        </section2>
      </div>
      <div class="w-full h-screen flex justify-center divcontainer">
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
          <p class="font-medium unselectable mt-[20%] sm:mt-[24rem] font-[Poppins] z-10 tracking-tighter italic absolute text-[1.6rem] sm:text-[2.5rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d]">
            Upgradeable, machine-coded*, multi-chain, DeFi/GameFi ecosystem.
          </p>
          <a
            target="_blank"
            class="font-medium sm:mt-[32rem] invisible xl:visible mt-[50%] font-[Poppins] z-10 tracking-tighter italic absolute text-[1.4rem] sm:text-[2rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d]"
            href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit"
          >
            {" "}
            <div class="cursor-pointer hover:scale-[105%]">Learn more</div>{" "}
          </a>
          <div class="sm:bottom-5 sm:absolute relative bottom-[-15rem]">
            <Available />
          </div>
        </div>
        <div class="absolute lg:top-4 top-[6.8rem] z-20 left-1 sm:left-4">
          <a
            class="bottom-0"
            target="_blank"
            href="https://linktr.ee/dizzyhavoc"
          >
            <div className="text-lg text-[#3d3d3d] dark:text-[#d2d2d2] dark:bg-[#191919] text-center w-[100px] shadow-md dark:shadow-[#bfbfbf04] shadow-[#e9e9e9] font-[Poppins] rounded-lg hover:scale-[105%] dark:border-[#d2d2d228] border z-20 border-[#e9e9e9] cursor-pointer bg-[#f1f1f1]">
              🌐Socials
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
