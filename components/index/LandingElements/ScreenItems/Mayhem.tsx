export function Mayhem(){
    return(
        <div class="z-30 w-full h-full vignets unselectable absolute items-start sm:items-center justify-center flex flex-col sm:flex-row">
        <div class="flex flex-col">
        <img class="sm:size-[100px] ml-[1rem] sm:ml-0 mb-2 size-[90px] contrast-75" draggable={false} src="/misc/Lib.png" alt="Mayhem" />
        </div>
        <div class="flex flex-col ml-[1rem]">
        <p class="sm:text-4xl text-2xl dark:text-[#d2d2d2] text-[#3d3d3d] font-medium unselectable font-[Poppins]">Mayhem, a new rich Web3 library.</p>
        <p class="sm:text-2xl text-xl dark:text-[#d2d2d2] text-[#3d3d3d] italic unselectable font-[Poppins]">Ejra, Toad, Snail, Vertigo & Vortex. A complete toolset for developers.</p>
        <p class="sm:text-xl text-md dark:text-[#d2d2d2] text-[#3d3d3d] bold unselectable font-[Poppins]">See the developement live on <a class="text-[#3b2d82] dark:text-[#ccb286] bold" draggable={false} target="_blank" href="https://github.com/bradbrown-llc?tab=repositories">github.</a></p>
        <p class="sm:text-lg text-sm dark:text-[#d2d2d2] text-[#3d3d3d] italic unselectable font-[Poppins]">Documentation will be available soon.</p>
        </div>
      </div>
    )
}