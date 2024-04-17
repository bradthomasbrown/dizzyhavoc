export default function Pair2(){
    const content1 = "With multi-Chain support.";
    const content2 = "Multi-Node Support.";
    const content3 =
      "Smarter Network Resource Usage: Optimization of network resource utilization, minimizing congestion, and maximizing overall performance for efficient blockchain interactions. ";
return( 
  <div class="md:flex-row w-full gap-5 justify-center items-center mx-auto sm:mx-0 flex-col flex">
  <div class="flex flex-row p-9 sm:size-[450px] size-full dark:text-[#d2d2d2] text-[#3d3d3d] h-full rounded-xl shadow-lg bg-blur2 sm:flex-col">
    <div class="flex flex-col">
    <h1 class="sm:text-3xl text-2xl font-[Poppins]">
      A new Cross-Chain Web3 Library.
    </h1>
    <ul class="mt-2 list-disc list-inside">
      <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
        {content1}
      </li>
      <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
        {content2}
      </li>
      <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
        {content3}
      </li>
    </ul>
  </div>
</div>
<div class="flex flex-row sm:mx-0 mx-auto p-4 sm:mt-0 sm:size-[450px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] rounded-xl shadow-lg bg-blur2">
  <div class="w-full h-full">
    <div
      class="size-[100%] rounded-lg dark:bg-[url('/info/darkNodes.png')] bg-[url('/info/whiteNodes.png')]"
      style="background-size: contain; background-repeat: no-repeat;"
    >
    </div>
  </div>
</div>
</div>)
}