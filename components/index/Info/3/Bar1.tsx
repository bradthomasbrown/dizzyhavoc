export function Bar1() {
  const content1 =
    "Reduction in deployment costs by reusing implementation code instead of redeploying it.";
  const content2 =
    "Flexibility in configuring the resolver to point to different implementations, promoting code reusability.";
  const content3 =
    "Ability to evolve and optimize smart contracts over time, with all deployments benefiting from updates to the underlying implementation.";
  return (
    <div class="flex flex-row sm:p-9 p-4 sm:w-[920px] size-[330px] dark:text-[#d2d2d2] text-[#3d3d3d] h-full bg-blur4 shadow-lg rounded-xl sm:flex-col">
      <div class="flex flex-col">
        <h1 class="sm:text-3xl text-xl font-[Poppins] font-medium text-center">
          What would be its impact?
        </h1>
        <ul class="mt-2 list-disc list-inside">
          <li class="text-lg mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content1}
          </li>
          <li class="text-lg mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content2}
          </li>
          <li class="text-lg mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content3}
          </li>
        </ul>
      </div>
    </div>
  );
}
