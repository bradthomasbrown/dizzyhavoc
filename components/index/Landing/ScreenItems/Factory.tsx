export function Factory(){
    return(
        <div class="z-[2] w-full h-full vignets unselectable absolute items-start sm:items-center justify-center flex flex-col sm:flex-row">
        <div class="flex flex-col">
        <img class="sm:size-[120px] vignets ml-[1rem] sm:ml-0 mb-2 size-[100px] contrast-75" draggable={false} src="/misc/Factory.png" alt="GameFI" />
        </div>
        {/* <div class="flex flex-col ml-[1rem]">
        <p class="sm:text-4xl text-2xl dark:text-[#d2d2d2] text-[#3d3d3d] font-medium unselectable font-[Poppins]">ERC token Factory</p>
        <p class="sm:text-xl text-md dark:text-[#d2d2d2] text-[#3d3d3d] bold unselectable font-[Poppins]">With drastically reduced fees/costs.</p>
        </div> */}
      </div>
    )
}