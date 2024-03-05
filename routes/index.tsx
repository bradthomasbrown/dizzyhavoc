import More from "../components/More.tsx";
import Tokendata from "../islands/tokendata.tsx";
import Info from "../components/Info.tsx";
import Roadmap from "../components/Roadmap.tsx";
export default function Home() {
  return (
    <>
      <div class="w-full h-full flex justify-center">
        <div class="flex w-full flex-col items-center mb-[5rem]">
          <h1 class="lg:text-[8rem] text-[3rem] mt-[5rem] underline font-bold text-[#2f2f2f] font-mono">
            dizzyhavoc
          </h1>
          <p class="font-medium italic text-[1.3rem] text-center w-[screen] sm:w-[50%] mt-[0.5rem] bg-blur rounded-xl px-2 mb-[1rem]">
            Upgradeable, machine-coded, multi-chain, DeFi/GameFi ecosystem. New
            cross-chain web3 library.
          </p>
          <Info />
          <Roadmap />
          <Tokendata />
        </div>
        <div className="w-full h-full absolute z-[-10]">
          <img
            className="absolute top-4 left-4 w-[5%]"
            src="/dzhv-art.jpg"
            alt="dizzyhavoc eye"
          ></img>
          <img
            className="absolute top-0 right-0 w-[45%]"
            src="/dzhv.png"
            alt="dizzyhavoc eye"
          ></img>
        </div>
      </div>
      <More />
    </>
  );
}
