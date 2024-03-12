import MarketData from "../islands/MarketData.tsx";
export default function Stats() {
  return (
    <>
      <div class="h-full translate-y-0 sm:translate-y-[10%]">
        <div class="max-w-[480px] h-screen mx-auto flex flex-col items-center justify-center">
        <MarketData />
        </div>
      </div>
    </>
  );
}
