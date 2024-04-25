export function Bar2() {
  const content1 =
    "The primary focus at the moment is on constructing the cross chain bridge.";
  const content2 = "Then, expanding to as many mainnet chains as possible.";
  return (
    <div class="flex flex-row sm:p-9 p-4 sm:w-[920px] size-[320px] dark:text-[#d2d2d2] text-[#3d3d3d] h-full  bg-blur4 shadow-lg rounded-xl sm:flex-col">
      <div class="flex flex-col">
        <h1 class="sm:text-3xl text-xl font-[Poppins] font-medium text-center">
          What to expect next?
        </h1>
        <ul class="mt-2">
          <li class="text-lg mt-2 dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content1}
          </li>
          <li class="text-lg dark:sm:font-normal sm:font-normal font-normal dark:font-light">
            {content2}
          </li>
          <h1 class="text-lg mt-7 dark:sm:font-normal sm:font-medium tracking-tight font-normal dark:font-light">
            Further details, such as tokenomics and user guide, can be found on
            {" "}
            <a
              draggable={false}
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
              draggable={false}
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
  );
}
