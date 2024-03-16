import Button from "../islands/common/Button.tsx";
export default function dApps() {
  return (
    <>
      <div class="sm:h-screen h-full justify-center flex flex-col">
        <p
          class="
    unselectable
    text-[2.2rem]
    text-center
    dark:text-[#d0d0d0]
    text-[#3d3d3d]
    mx-auto
    font-[Poppins]
    bg-transparent
    rounded-xl
    px-6
    mb-[0.5rem]
    "
        >
          dApps portal
        </p>
        <div class="flex mx-auto gap-11 flex-col">
          <div class="flex gap-11 flex-col sm:flex-row">
            <div class="flex flex-col">
              <div class="sm:w-[430px] relative w-screen h-[350px] rounded-lg dark:bg-blur4 bg-blur2">
                <div class="bottom-0 mx-[50%] translate-x-[-50%] mb-3 absolute"><Button addClass="">launch</Button></div>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="sm:w-[430px] relative w-screen h-[350px] rounded-lg dark:bg-blur4 bg-blur2">
                <div class="bottom-0 mx-[50%] translate-x-[-50%] mb-3 absolute"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
