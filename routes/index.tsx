import Landing from "../components/index/Landing.tsx";
import Info from "../components/index/Info.tsx";
import Socials from "../components/common/Socials.tsx";
export default function Home() {
  return (
    <>
      <div class="w-full h-full flex">
        <div class="w-full h-full">
          <Landing />
          <Info />
        </div>
        <Socials />
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
