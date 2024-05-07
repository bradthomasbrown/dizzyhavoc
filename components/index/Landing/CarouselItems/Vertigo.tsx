export function Vertigo_img(props:{addclass?:string}){
  return(
      <div class={`w-full h-full unselectable ${props.addclass}`}>
        <div class="flex flex-col">
        <img class="sm:size-[110px] vignets ml-[1rem] size-[90px] contrast-75 rounded-xl" draggable={false} src="/carousel/Vertigo.jpg" alt="dzhv chevron" />
        </div>
      </div>
    )
}