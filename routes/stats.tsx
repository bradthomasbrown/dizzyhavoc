import ActiveContainer from "../islands/stats/ActiveContainer.tsx";

export default function Stats() {
  return (
      <div class="h-full sm:mb-[230px] mb-[100px] sm:h-screen translate-y-0 sm:translate-y-[7%]">
              <p
        class="mb-[0.5rem]
  font-medium
  sm:text-[1.5rem]
  text-[1rem]
  unselectable
  mx-auto
  text-center
  dark:text-[#d0d0d0]
  text-[#3d3d3d]
  font-[Poppins]
  sm:mt-[0.2rem]
  mt-[1rem]
  bg-transparent
  lg:max-w-[32rem]
  max-w-full
  rounded-xl"
      >
        DZHV Ecosystem Analytics
      </p>
        <ActiveContainer />
        </div>
  );
}
