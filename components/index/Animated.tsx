export default function Animated() {
  return (
    <div>
      <div class="flex flex-col h-screen items-center border-transparent lg:border-[#595959] border-2 lg:border-t-transparent lg:border-e-transparent lg:border-s-transparent border-t-transparent border-e-transparent border-s-transparent">
      <div class="h-[65%] sm:mt-5 mt-0 w-[99%]">
        <div
          class="h-[97.5%] sm:mt-2 mt-0 sm:w-[50%] w-full justify-center mx-auto rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur3"
        ></div>
      </div>
        <div class="w-full flex justify-center">
          <div class="flex flex-col items-center">
            <div class="absolute min-w-full">
              <div class="w-full z-[10] shadow-xl">
                <p class="font-medium font-[Poppins] sm:mt-7 mt-0 unselectable z-10 w-full tracking-tighter absolute text-[1.5rem] sm:text-[2rem] text-start sm:text-center dark:text-[#d2d2d2] text-[#3d3d3d] px-2 ">
                  Upgradeable, machine-coded*, multi-chain, DeFi/GameFi
                  ecosystem.
                </p>
              </div>
              <div
                class="trapeze invisible lg:visible mt-12 sm:max-w-[66rem] max-w-[70%] mx-auto z-[-10] shadow-lg dark:shadow-[#21212130] shadow-[#99999930]"
                id="trapeze"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
