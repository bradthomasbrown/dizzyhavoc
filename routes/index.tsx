import Landing from "../components/index/Landing.tsx";
import Info from "../components/index/Info.tsx";
export default function Home() {
  return (
    <>
      <div class="w-full h-full flex justify-center sm:mb-[230px] mb-[100px]">
        <div class="w-full h-full">
          <Landing />
          <Info />
        </div>
        <div class="absolute lg:top-4 top-[4.7rem] sm:visible invisible z-20 left-1 sm:left-4">
          <a
            draggable={false}
            class="bottom-0"
            target="_blank"
            href="https://linktr.ee/dizzyhavoc"
          >
            <div className="text-lg text-[#3d3d3d] dark:text-[#d2d2d2] dark:bg-[#101010] text-center w-[100px] shadow-md dark:shadow-[#bfbfbf04] shadow-[#e9e9e9] font-[Poppins] rounded-lg hover:scale-[105%] dark:border-[#d2d2d228] border z-20 border-[#e9e9e9] cursor-pointer bg-[#f1f1f1]">
              🌐Socials
            </div>
          </a>
        </div>
        <img
          className="absolute hidden top-0 z-[-10] left-0 w-[25%]"
          src="/misc/dzhv.png"
          alt="dizzyhavoc eye"
        >
        </img>
      </div>
    </>
  );
}
