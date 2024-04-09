import Stars from "./Animations/Stars.tsx";
import Vertigo from "./ScreenItems/Vertigo.tsx";
export default function Screen() {
  return (
    <div class="h-[65%] w-[99%] sm:mt-5 mt-0">
      <div class="h-[90%] relative sm:w-[75%] w-full sm:mt-2 mt-0 sm:p-5 p-0 justify-center mx-auto overflow-hidden
       rounded-lg shadow-inner shadow-[#d6d6d6] dark:shadow-[#141414] bg-blur4">
        <Vertigo />
        <Stars />
      
      </div>
    </div>
  );
}
