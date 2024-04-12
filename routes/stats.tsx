import ActiveContainer from "../islands/stats/ActiveContainer.tsx";
export default function Stats() {
  return (
      <div class="h-full pb-[230px] sm:pb-[100px]">
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
