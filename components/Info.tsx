export default function Info() {
  const content1 =
    "DizzyHavoc is a new deployment method for smart contracts, specifically designed to reduce costs and enhance flexibility.";
    const content1_2 =
    "Instead of redeploying the same code multiple times, it utilizes an upgradable proxy that points to a specialized resolver, which in turn links to one or more implementations.";
    const content1_3 =
    "By doing this, it significantly lowers deployment costs and allows for easier maintenance and upgrades of smart contracts.";
    const content1_4 = "* What makes DizzyHavoc unique is the utilization of the EVM bytecode language instead of Solidity. This implies a more low-level and hardware-specific form of programming, closely tied to the architecture of CPUs.";
  const content2 =
    "● Reduction in deployment costs by reusing implementation code instead of redeploying it.";
  const content3 =
    "● Flexibility in configuring the resolver to point to different implementations, promoting code reusability.";
  const content4 =
    "● Ability to evolve and optimize smart contracts over time, with all deployments benefiting from updates to the underlying implementation.";
  const content5 =
    "● The primary focus at the moment is on constructing the cross chain bridge.";
  const content6 =
    "● Then, expanding to as many mainnet chains as possible.";
  const content7 = "● With multi-Chain support.";
  const content8 = "● Multi-Node Support.";
  const content9 = "● Smarter Network Resource Usage: Optimization of network resource utilization, minimizing congestion, and maximizing overall performance for efficient blockchain interactions. ";
  const content10 = "● Better Batching Support: Streamlining transaction processing by grouping multiple transactions into batches, leading to reduced overhead and enhanced gas efficiency.";
  const content11 = "● Easier to write with: Simplification of the development process, more intuitive and user-friendly interface.";
 
 return (
  <>
  <div class="">
  <p id="Infos"
  class="font-medium
  italic
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
  mb-[3.5rem]">
  What is DizzyHavoc ?</p>
  <div class="xl:flex-row w-full flex-col flex">
      <div class="flex flex-row p-11 min-w-full xl:min-w-[30rem] max-w-[40rem] xl:max-w-[20rem] dark:text-[#d2d2d2] text-[#3d3d3d] mx-auto h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
       <div class="flex flex-col">
        <ul>
        <h1 class="sm:text-3xl text-2xl font-[Poppins]">Simplified Cross-Chain contracts.</h1>
        <p class="mt-4 dark:sm:font-normal sm:font-normal font-normal dark:font-light text-xl">{content1}</p>
        {/* <p class="mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light text-xl">{content1_2}</p>
        <p class="mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light text-xl">{content1_3}</p> */}
        <p class="mt-2 font-medium text-xl">{content1_4}</p>
      </ul>
        </div>
      </div>

      <div class="flex flex-row p-4 mt-7 sm:mt-0  sm:size-[440px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] mx-auto  rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
  <div class="w-full h-full">
    <div class="size-[100%] rounded-lg dark:bg-[url('/darksolvsbytecode.png')] bg-[url('/solvsbytecode.png')]" style="background-size: contain; background-repeat: no-repeat;"></div>
  </div>
</div>
      </div>
      <div class="xl:flex-row w-full sm:mt-[5rem] mt-9 flex-col flex">
    <div class="flex flex-row p-11 min-w-full xl:min-w-[30rem] max-w-[40rem] xl:max-w-[20rem] dark:text-[#d2d2d2] text-[#3d3d3d] mx-auto h-[100%] pb-[5.72rem] rounded-xl shadow-lg dark:bg-blur4 bg-blur2 sm:flex-col-reverse">
        <div class="flex col-start flex-col">
            <h1 class="sm:text-3xl text-2xl font-[Poppins]">A new Cross-Chain Web3 Library.</h1>
            <ul class="mt-2">
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content7}</li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content8}</li>
                <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content9}</li>
            </ul>
        </div>
    </div>
    <div class="flex flex-row p-4 mt-7 sm:mt-0 sm:size-[440px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] mx-auto  rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
  <div class="w-full h-full">
    <div class="size-[100%] rounded-lg dark:bg-[url('/darkNodes.png')] bg-[url('/whiteNodes.png')]" style="background-size: contain; background-repeat: no-repeat;"></div>
  </div>
</div>

</div>
      <div class="xl:flex-row sm:mt-[5rem] mt-9 flex-col flex">
      <div class="flex flex-row p-11 min-w-full xl:min-w-[30rem] max-w-[40rem] xl:max-w-[20rem] dark:text-[#d2d2d2] text-[#3d3d3d] mx-auto h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
       <div class="flex flex-col">
       <h1 class="sm:text-3xl text-2xl font-[Poppins]">What would be its impact?</h1>
        <ul class="mt-2">
          <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content2}</li>
          <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content3}</li>
          <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content4}</li>
        </ul>
       </div>
       
  
      </div>
      <div class="flex flex-row  sm:mt-0 mt-8 p-11 min-w-full xl:min-w-[30rem] max-w-[40rem] xl:max-w-[20rem] dark:text-[#d2d2d2] text-[#3d3d3d] mx-auto h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
       <div class="flex flex-col">
       <h1 class="sm:text-3xl text-2xl font-[Poppins]">What to expect next?</h1>

          <ul class="mt-2">
            <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content5}</li>
            <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">{content6}</li>
            <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            ● More infos in the litepaper{" "}
          <a
            class="text-indigo-900 dark:text-[#e0cdad] bold"
            target="_blank"
            href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit"
          >
            here
          </a>
              </li>
          </ul>
       </div>
      </div>
      </div>
      
      </div>
      </>
    );
    
}
