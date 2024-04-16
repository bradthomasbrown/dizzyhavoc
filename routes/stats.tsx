import ActiveContainer from "../islands/stats/ActiveContainer.tsx";
export default function Stats() {
  return (
    <div class="h-full">
      <p class="mb-[0.5rem]
  sm:text-[1.7rem]
  text-[1.4rem]
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[monospace]
  mt-[1rem]
  bg-transparent
  lg:max-w-[32rem]
  max-w-full
  rounded-xl">
      Ecosystem Analytics
      </p>
      <ActiveContainer />
    </div>
  );
}
