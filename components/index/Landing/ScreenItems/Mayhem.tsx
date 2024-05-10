export function Mayhem(){
    return(
        <div class="z-30 w-full h-full vignets unselectable absolute items-start sm:items-center justify-center flex flex-col sm:flex-row">
        <div class="flex flex-col">
        <img class="sm:size-[100px] vignets ml-[1rem] sm:ml-0 mb-2 size-[70px] invert-0 dark:invert dark:contrast-75 contrast-50" draggable={false} src="/carousel/Lib.png" alt="Mayhem" />
        </div>
        <div class="flex flex-col ml-[1rem]">
        <p class="sm:text-4xl text-xl dark:text-[#d2d2d2] text-[#3d3d3d] font-medium unselectable font-[Poppins]">A new rich Web3 library.</p>
        <p class="sm:text-2xl text-lg dark:text-[#d2d2d2] text-[#3d3d3d] italic unselectable font-[Poppins]">Ejra & Vortex. A complete toolset for developers.</p>
        <a class="w-[90px] h-[30px]" draggable={false} target="_blank" href="https://github.com/bradbrown-llc?tab=repositories"><div class="w-[90px] h-[30px] hover:scale-[102%] active:scale-[98%] mt-2 rounded-md dark:text-[#ccb286] text-[#b37635] bg-[#ccb28611] font-[Poppins] text-lg text-center font-light tracking-tight border dark:border-[#ccb286] border-[#b37635]">github</div></a>
        </div>
      </div>
    )
}