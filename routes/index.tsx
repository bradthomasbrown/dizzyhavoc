import Info from "../components/index/Info.tsx";
import Animated from "../components/index/Animated.tsx";
export default function Home() {
  return (
    <>
      <div class="w-full h-full flex justify-center">
        <div class="w-full h-full items-center">
          <Animated />
          <Info />
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
        <img
          className="absolute hidden top-0 z-[-10] right-0 w-[25%]"
          src="/dzhv.png"
          alt="dizzyhavoc eye"
        ></img>
      </div>
    </>
  );
}
