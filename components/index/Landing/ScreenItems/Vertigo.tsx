export function Vertigo(){
    return(
        <div class="z-30 w-full h-full vignets unselectable absolute items-start sm:items-center justify-center flex flex-col sm:flex-row">
        <div class="flex flex-col">
        <img class="sm:size-[100px] ml-[1rem] sm:ml-0 mb-2 size-[90px] contrast-75" draggable={false} src="/carousel/Vertigo.jpg" alt="dzhv chevron" />
        </div>
        <div class="flex flex-col ml-[1rem]">
        <p class="sm:text-3xl text-2xl dark:text-[#d2d2d2] text-[#3d3d3d] font-medium unselectable font-[Poppins]">Vertigo, a cutting-edge bridge for $DZHV.</p>
        <p class="sm:text-2xl text-xl dark:text-[#d2d2d2] text-[#3d3d3d] italic unselectable font-[Poppins]">Fast and secure, with reduced fees and in-depth optimizations.</p>
        <p class="sm:text-xl text-md dark:text-[#d2d2d2] text-[#3d3d3d] bold unselectable font-[Poppins]">Live on testnet, try it now <a class="text-[#3b2d82] dark:text-[#ccb286] bold" draggable={false} target="_blank" href="https://beta.dzhv.io/bridge">here.</a></p>
        </div>
      </div>
    )
}