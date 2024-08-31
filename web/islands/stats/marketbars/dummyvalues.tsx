import { Placeholder } from "../charts/placeholder.tsx";
export function DummyValues() {
  return (
    <div class="flex opacity-15 w-full items-start sm:items-center flex-row">
      <div class="z-[1] vignets2 justify-around w-[305px] flex sm:mx-3 mx-0 sm:flex-col flex-row">
        <div class="flex sm:flex-row flex-col">
          <section class="mt-[0px] sm:mt-0 flex sm:flex-row flex-col w-full ml-0">
            <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">
              $0.0000
            </h1>
            <h1
              title="24h price change"
              class={`font-[Poppins] unselectable text-[#4da235] font-medium text-[0.7rem] ml-1 sm:text-[0.7rem] inline `}
            >
              +0%
            </h1>
          </section>
        </div>
        <div class="mt-[5px] sm:mt-0 rounded-md">
          <div class="flex sm:flex-row flex-col">
            <section class="flex sm:flex-row flex-col mx-auto w-full items-center">
              <h2 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] sm:text-start text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                Liquidity:{" "}
              </h2>
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.80rem] sm:text-[1rem] inline">
                $0K
              </h1>
            </section>
          </div>
        </div>
        <div class="mt-[5px] sm:mt-0 rounded-md">
          <div class="flex flex-row sm:flex-col">
            <section class="flex sm:flex-row flex-col mx-auto w-full items-center">
              <h2 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] sm:text-start text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                24h Vol:{" "}
              </h2>
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.80rem] sm:text-[1rem] inline">
                $0K
              </h1>
            </section>
          </div>
        </div>
        <div class="px-[2px] sm:px-0 mt-[5px] sm:mt-0 rounded-md">
          <div class="flex flex-row sm:flex-col">
            <section class="flex sm:flex-row flex-col mx-auto w-full items-center">
              <h2 class="unselectable font-[Poppins] dark:text-[#b2b2b2] text-[#414141] sm:text-start text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                24h Tx:{" "}
              </h2>
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.80rem] sm:text-[1rem] inline">
                0
              </h1>
            </section>
          </div>
        </div>
      </div>
      <div class="flex vignets2 sm:z-[2] z-0 absolute sm:left-[37.5%] left-[0%] flex-row">
        <Placeholder />
      </div>
    </div>
  );
}
