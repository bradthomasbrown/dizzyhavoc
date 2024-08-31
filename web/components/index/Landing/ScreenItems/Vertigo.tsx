export function Vertigo(){
    return(
        <div class="z-30 w-full h-full vignets unselectable absolute items-start sm:items-center justify-center flex flex-col sm:flex-row">
        <div class="flex flex-col">
        <img class="sm:size-[100px] ml-[1rem] sm:ml-0 mb-2 size-[70px] contrast-75 rounded-xl" draggable={false} src="/carousel/Vertigo.jpg" alt="dzhv chevron" />
        </div>
        <div class="flex flex-col ml-[1rem]">
        <p class="sm:text-3xl text-xl dark:text-[#d2d2d2] text-[#3d3d3d] font-medium unselectable font-[Poppins]">Vertigo, a cutting-edge bridge for $DZHV.</p>
        <p class="sm:text-2xl text-md dark:text-[#d2d2d2] text-[#3d3d3d] italic unselectable font-[Poppins]">Fast and secure, with reduced fees and in-depth optimizations.</p>
        <a class="w-[190px] h-[30px]" draggable={false} target="_blank" href="https://beta.dzhv.io/bridge"><div class="w-[190px] h-[30px] hover:scale-[102%] active:scale-[98%] mt-2 rounded-md dark:text-[#ccb286] text-[#b37635] bg-[#ccb28611] font-[Poppins] text-lg text-center font-light tracking-tight border dark:border-[#ccb286] border-[#b37635]">Try now on testnet</div></a>
        </div>
      </div>
    )
}