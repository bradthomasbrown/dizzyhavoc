import Buy from "../components/Buy.tsx";
import Secret from "../components/Secret.tsx";

export default function More() {
  return (
    <>
      <div class="w-full flex-col xl:flex-row gap-3 px-3 justify-center flex">
        <Buy />
        <Secret />
        <div className="w-full h-full absolute z-[-10]">
          <img
            className="absolute shadow-lg bottom-2 right-4 w-[5%]"
            src="/dzhv-art.jpg"
            alt="dizzyhavoc eye"
          >
          </img>
          <img
            className="absolute bottom-2 left-4 blur-sm w-[25%]"
            src="/dzhv.png"
            alt="dizzyhavoc eye"
          >
          </img>
        </div>
      </div>
    </>
  );
}
