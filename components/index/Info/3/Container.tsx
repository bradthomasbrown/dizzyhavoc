import { Bar1 } from "./Bar1.tsx";
import { Bar2 } from "./Bar2.tsx";
export function Container3() {
  return (
    <div class="w-full gap-y-5 sm:gap-y-[6rem] justify-center items-center mx-auto sm:mx-0 flex-col flex">
      <Bar1 />
      <Bar2 />
    </div>
  );
}
