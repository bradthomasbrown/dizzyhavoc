export default function Tagline() {
  return (
    <div class="flex sm:bottom-[8rem] bottom-[10%] absolute w-full mt-7 flex-col justify-center items-center">
      <div class="absolute min-w-full">
        <div class="w-full z-[1] shadow-xl">
          <p class="font-medium font-[Poppins] sm:mt-7 mt-0 unselectable z-10 w-full tracking-tighter absolute text-[1.3rem] sm:text-[2rem] text-start sm:text-center dark:text-[#d2d2d2] text-[#3d3d3d] px-2 ">
            Upgradeable, machine-coded*, multi-chain, DeFi/GameFi ecosystem.
          </p>
        </div>
        <div
          class="trapeze invisible lg:visible mt-12 sm:max-w-[66rem] max-w-[70%] z-[1] mx-auto shadow-lg dark:shadow-[#21212130] shadow-[#99999930]"
          id="trapeze"
        >
        </div>
      </div>
    </div>
  );
}
