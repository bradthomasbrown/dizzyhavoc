export function Pair() {
  const content1 =
    "DizzyHavoc is a new deployment method for smart contracts, specifically designed to reduce costs and enhance flexibility.";
  const content2 =
    "* What makes DizzyHavoc unique is the utilization of the EVM bytecode language instead of Solidity. This implies a more low-level and hardware-specific form of programming, closely tied to the architecture of CPUs.";
  return (
    <div class="md:flex-row w-full gap-5 justify-center items-center mx-auto sm:mx-0 flex-col flex">
      <div class="flex flex-row sm:p-9 p-4 sm:size-[450px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] h-full rounded-xl shadow-lg bg-blur4 bg-transparent sm:flex-col">
        <div class="flex flex-col">
          <ul>
            <h1 class="sm:text-3xl text-xl font-medium font-[Poppins]">
              Simplified Cross-Chain contracts.
            </h1>
            <p class="mt-4 dark:sm:font-normal sm:font-normal font-normal dark:font-light text-lg">
              {content1}
            </p>
            <p class="mt-2 bg-blur4 rounded-md p-2 text-lg">{content2}</p>
          </ul>
        </div>
      </div>
      <div class="flex flex-row p-4 sm:mt-0 sm:size-[450px] size-[380px] dark:text-[#d2d2d2] text-[#3d3d3d] shadow-lg bg-blur4 rounded-xl">
        <div class="w-full h-full">
          <div
            class="size-[100%] rounded-lg dark:bg-[url('/info/darksolvsbytecode.png')] bg-[url('/info/solvsbytecode.png')]"
            style="background-size: contain; background-repeat: no-repeat;"
          >
          </div>
        </div>
      </div>
    </div>
  );
}
