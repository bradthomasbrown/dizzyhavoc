import Available from "./AvailableOn.tsx";
export default function Info() {
  const content1 =
    "DizzyHavoc is a new deployment method for smart contracts, specifically designed to reduce costs and enhance flexibility.";
  const content1_2 =
    "Instead of redeploying the same code multiple times, it utilizes an upgradable proxy that points to a specialized resolver, which in turn links to one or more implementations.";
  const content1_3 =
    "By doing this, it significantly lowers deployment costs and allows for easier maintenance and upgrades of smart contracts.";
  const content1_4 =
    "* What makes DizzyHavoc unique is the utilization of the EVM bytecode language instead of Solidity. This implies a more low-level and hardware-specific form of programming, closely tied to the architecture of CPUs.";
  const content2 =
    "Reduction in deployment costs by reusing implementation code instead of redeploying it.";
  const content3 =
    "Flexibility in configuring the resolver to point to different implementations, promoting code reusability.";
  const content4 =
    "Ability to evolve and optimize smart contracts over time, with all deployments benefiting from updates to the underlying implementation.";
  const content5 =
    "The primary focus at the moment is on constructing the cross chain bridge.";
  const content6 = "Then, expanding to as many mainnet chains as possible.";
  const content7 = "With multi-Chain support.";
  const content8 = "Multi-Node Support.";
  const content9 =
    "Smarter Network Resource Usage: Optimization of network resource utilization, minimizing congestion, and maximizing overall performance for efficient blockchain interactions. ";
  const content10 =
    "Better Batching Support: Streamlining transaction processing by grouping multiple transactions into batches, leading to reduced overhead and enhanced gas efficiency.";
  const content11 =
    "Easier to write with: Simplification of the development process, more intuitive and user-friendly interface.";

  return (
    <>
      <p
        id="info"
        class="info
  font-medium
  text-[1.7rem]
  unselectable
  sm:text-[2.5rem]
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  mx-auto
  font-[Poppins]
  shadow-lg
  mt-[0.5rem]
  py-3
  bg-blur2
  lg:max-w-[32rem]
  max-w-full
  rounded-xl
  px-6
  mb-[3.5rem]"
      >
        What is DizzyHavoc?
      </p>
      <div class="w-full mb-[230px]">
        <div class="md:flex-row w-full gap-5 justify-center items-center mx-auto sm:mx-0 flex-col flex">
          <div class="flex flex-row p-9 sm:size-[450px] size-full dark:text-[#d2d2d2] text-[#3d3d3d] h-full rounded-xl shadow-lg dark:bg-blur4 bg-blur2 sm:flex-col">
            <div class="flex flex-col">
              <ul>
                <h1 class="sm:text-3xl text-2xl font-[Poppins]">
                  Simplified Cross-Chain contracts.
                </h1>
                <p class="mt-4 dark:sm:font-normal sm:font-normal font-normal dark:font-light text-xl">
                  {content1}
                </p>
                <p class="mt-2 font-medium text-xl">{content1_4}</p>
              </ul>
            </div>
          </div>
          <div class="flex flex-row p-4 mt-7 sm:mt-0 sm:size-[450px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
            <div class="w-full h-full">
              <div
                class="size-[100%] rounded-lg dark:bg-[url('/info/darksolvsbytecode.png')] bg-[url('/info/solvsbytecode.png')]"
                style="background-size: contain; background-repeat: no-repeat;"
              ></div>
            </div>
          </div>
        </div>
        <div class="md:flex-row w-full mx-auto sm:mx-0 gap-5 justify-center sm:mt-[5rem] mt-9 flex-col flex">
          <div class="flex  flex-row p-9 sm:size-[450px] size-full dark:text-[#d2d2d2] text-[#3d3d3d] h-[100%] pb-[5.72rem] rounded-xl shadow-lg dark:bg-blur4 bg-blur2 sm:flex-col-reverse">
            <div class="flex  col-start flex-col">
              <h1 class="sm:text-3xl text-2xl font-[Poppins]">
                A new Cross-Chain Web3 Library.
              </h1>
              <ul class="mt-2 list-disc list-inside">
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content7}
                </li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content8}
                </li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content9}
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-row sm:mx-0 mx-auto p-4 mt-7 sm:mt-0 sm:size-[450px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
            <div class="w-full h-full">
              <div
                class="size-[100%] rounded-lg dark:bg-[url('/info/darkNodes.png')] bg-[url('/info/whiteNodes.png')]"
                style="background-size: contain; background-repeat: no-repeat;"
              ></div>
            </div>
          </div>
        </div>
        <div class="md:flex-row w-full  gap-5 justify-center sm:mt-[5rem] mt-9 flex-col flex">
          <div class="flex flex-row p-9 sm:size-[450px] size-full dark:text-[#d2d2d2] text-[#3d3d3d] h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
            <div class="flex flex-col">
              <h1 class="sm:text-3xl text-2xl font-[Poppins]">
                What would be its impact?
              </h1>
              <ul class="mt-2 list-disc list-inside">
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content2}
                </li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content3}
                </li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content4}
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-row sm:size-[450px] size-full  sm:mt-0  gap-5 mt-8 p-9 dark:text-[#d2d2d2] text-[#3d3d3d] h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
            <div class="flex flex-col">
              <h1 class="sm:text-3xl text-2xl font-[Poppins]">
                What to expect next?
              </h1>
              <ul class="mt-2 list-disc list-inside">
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content5}
                </li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
                  {content6}
                </li>
                <h1 class="text-xl mt-7 dark:sm:font-normal sm:font-medium tracking-tight font-normal dark:font-light">
                  More infos in the litepaper{" "}
                  <a
                    href="/info/litepaper.pdf"
                    target="_blank"
                    class="text-[#3b2d82] dark:text-[#e0cdad] bold">
                    here
                  </a>
                </h1>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex scale-75 mx-auto justify-center sm:mt-0 bottom-5">
          <Available />
        </div>
      </div>

    </>
  );
}
