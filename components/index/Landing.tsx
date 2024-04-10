import Screen from "../../islands/index/Screen.tsx";
import AvailableOn from "../index/AvailableOn.tsx";
export default function Landing() {
  return (
    <div>
      <div class="flex flex-col h-screen items-center">
        <Screen />
        <div class="sm:mt-[4.5rem] mt-[5rem] sm:scale-[50%] scale-[90%]">
        <AvailableOn />
        </div>
     
      </div>
    </div>
  );
}
