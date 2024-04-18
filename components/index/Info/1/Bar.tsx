export function Bar() {
  return (
    <div class="mt-4 flex flex-row p-3 sm:w-[920px] size-full dark:text-[#d2d2d2] text-[#3d3d3d] h-full  bg-blur4 shadow-lg rounded-xl sm:flex-col">
      <div class="flex flex-col">
        <h1 class="text-2xl mt-2 dark:sm:font-normal sm:font-normal tracking-tight font-normal dark:font-light">
          DizzyHavoc's contract documentation can be found{" "}
          <a
            draggable={false}
            href="https://dizzyhavoc.gitbook.io/dizzyhavoc"
            target="_blank"
            class="text-[#3b2d82] dark:text-[#ccb286] bold"
          >
            here.
          </a>
        </h1>
      </div>
    </div>
  );
}
