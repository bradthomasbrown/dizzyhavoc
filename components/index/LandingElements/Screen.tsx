import Stars from "./Stars.tsx";
export default function Screen() {
  return (
    <div class="h-[65%] sm:mt-5 mt-0 w-[99%]">
      <div class="h-[97.5%] sm:mt-2 mt-0 sm:w-[50%] w-full overflow-hidden sm:p-5 p-1 justify-center mx-auto rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur3">
        <Stars />
      </div>
    </div>
  );
}
