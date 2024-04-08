import Stars from "./Animations/stars.tsx";
import Waves from "./Animations/waves.tsx";
export default function Animated() {
  return (
    <div>
      <div class="absolute h-screen border-transparent lg:border-[#595959] border-2 lg:border-t-transparent lg:border-e-transparent lg:border-s-transparent border-t-transparent border-e-transparent border-s-transparent w-full overflow-hidden -z-10 top-[4.5rem] sm:top-0">

      </div>
      <div class="flex flex-col h-screen justify-start sm:justify-center items-center">
        <div class="w-full flex justify-center">
          <div class="flex flex-col mt-[13rem] items-center">
            <div class="absolute min-w-full">
              <div class="w-full z-[10] shadow-xl">
                <p class="font-medium font-[Poppins] unselectable z-10 w-full tracking-tighter italic absolute text-[1.5rem] sm:text-[2.3rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d] px-2">
                  Upgradeable, machine-coded*, multi-chain, DeFi/GameFi
                  ecosystem.
                </p>
              </div>
              <div
                class="trapeze invisible lg:visible mt-4 sm:max-w-[73rem] max-w-[70%] mx-auto z-[-10] shadow-lg"
                id="trapeze"
              >
              </div>
            </div>
            <a
              class="font-medium font-[Poppins] z-10 tracking-tighter sm:mt-[7.5rem] mt-[7.5rem] text-[1.1rem] sm:text-[1.7rem] text-center dark:text-[#d2d2d2] text-[#3d3d3d]"
              href="#info"
            >
              <div class="cursor-pointer text-[#3b2d82] dark:text-[#ccb286] hover:scale-[105%]">
                Learn more
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
