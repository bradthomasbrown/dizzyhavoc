export const Title = "Vertigo, a cutting-edge bridge for $DZHV."
export const Description = "Fast and secure, with reduced fees and deep optimizations."
export const P = "Live on testnet, try it now"
export const Link = "https://beta.dzhv.io/bridge"
export function Vertigo(){
    return(
      <div class="z-[2] w-full h-full slidefadeout unselectable absolute">
        <div class="flex flex-col">
        <img class="sm:size-[120px] vignets ml-[1rem] size-[90px] contrast-75" draggable={false} src="/carousel/Vertigo.jpg" alt="dzhv chevron" />
        </div>
      </div>
    )
}