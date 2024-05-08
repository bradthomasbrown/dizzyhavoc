export function Mayhem_img(props:{addclass?:string}){
  return(
      <div class={`w-full h-full unselectable ${props.addclass}`}>
        <div class="flex flex-col">
        <img class="sm:size-[120px] vignets ml-[1rem] size-[90px] invert-0 dark:invert dark:contrast-75 contrast-50" draggable={false} src="/carousel/Lib.png" alt="Mayhem" />
        </div>
      </div>
    )
}