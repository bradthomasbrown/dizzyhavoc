import More from "../components/More.tsx";
import Info from "../components/Info.tsx";
import Roadmap from "../components/Roadmap.tsx";
import Buy from "../components/Buy.tsx";
import Secret from "../components/Secret.tsx";
export default function Home() {
  return (
    <>
      <div class="w-full h-full flex justify-center">
        <div class="flex w-full flex-col items-center mb-[5rem]">
          <h1 class="lg:text-[8rem] text-[3rem] mt-[5rem] underline font-Poppins text-[#2f2f2f]">
            DizzyHavoc
          </h1>
          <p class="font-medium italic text-[1.3rem] text-center w-full text-[#000000] shadow-lg sm:w-[50%] mt-[0.5rem] bg-blur2 rounded-xl px-2 mb-[1rem]">
            Upgradeable, machine-coded, multi-chain, DeFi/GameFi ecosystem. New
            cross-chain web3 library.
          </p>
          <div class="flex flex-col gap-3 px-3 lg:flex-row">
            <Info />
            <Roadmap />
          </div>
        </div>
        <div class="absolute top-4 left-4">
          <img
            className="shadow-lg w-[10%]"
            src="/dzhv-art.jpg"
            alt="dizzyhavoc eye"
          >
          </img>
          <a
            class="bottom-0 text-indigo-900"
            target="_blank"
            href="https://linktr.ee/dizzyhavoc"
          >
            socials{" (linktree)"}
          </a>
        </div>
        <img
          className="absolute top-0 z-[-10] right-0 w-[45%]"
          src="/dzhv.png"
          alt="dizzyhavoc eye"
        >
        </img>
      </div>
      <div class="flex flex-col gap-3 px-3 xl:flex-row">
        <Buy />
      </div>
    </>
  );
}
