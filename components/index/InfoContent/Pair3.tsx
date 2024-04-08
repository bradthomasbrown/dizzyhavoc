export default function Pair3(){
    const content1 =
    "Reduction in deployment costs by reusing implementation code instead of redeploying it.";
  const content2 =
    "Flexibility in configuring the resolver to point to different implementations, promoting code reusability.";
  const content3 =
    "Ability to evolve and optimize smart contracts over time, with all deployments benefiting from updates to the underlying implementation.";
  const content4 =
    "The primary focus at the moment is on constructing the cross chain bridge.";
  const content5 = "Then, expanding to as many mainnet chains as possible.";

return(
    <div class="md:flex-row w-full gap-5 justify-center sm:mt-[5rem] mt-9 flex-col flex">
    <div class="flex flex-row p-9 sm:size-[450px] size-full dark:text-[#d2d2d2] text-[#3d3d3d] h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
      <div class="flex flex-col">
        <h1 class="sm:text-3xl text-2xl font-[Poppins]">
          What would be its impact?
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
    <div class="flex flex-row sm:size-[450px] size-full sm:mt-0 gap-5 mt-8 p-9 dark:text-[#d2d2d2] text-[#3d3d3d] h-[100%] rounded-xl shadow-lg dark:bg-blur4 bg-blur2">
      <div class="flex flex-col">
        <h1 class="sm:text-3xl text-2xl font-[Poppins]">
          What to expect next?
        </h1>
        <ul class="mt-2 list-disc list-inside">
          <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content4}
          </li>
          <li class="text-xl mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content5}
          </li>
          <h1 class="text-lg mt-7 dark:sm:font-normal sm:font-medium tracking-tight font-normal dark:font-light">
          Further details, such as tokenomics and user guide, can be found on{" "}
            <a
              href="https://dizzyhavoc.gitbook.io/dizzyhavoc"
              target="_blank"
              class="text-[#3b2d82] dark:text-[#ccb286] bold"
            >
              gitbook.
            </a>
          </h1>
          <h1 class="text-lg mt-2 dark:sm:font-normal sm:font-medium tracking-tight font-normal dark:font-light">
           The litepaper is available{" "}
            <a
              href="/info/litepaper.pdf"
              target="_blank"
              class="text-[#3b2d82] dark:text-[#ccb286] bold"
            >
            here.
            </a>
          </h1>
        </ul>
      </div>
    </div>
  </div>
)
}