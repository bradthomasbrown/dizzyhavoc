export function Explore(props : {text:string}) {
  const text = props.text
    return (
        <div className="
        text-2xl
        text-[#3f3f3f]
        dark:text-[#bebebe]
        text-center w-[150px]
        shadow-lg font-[Poppins]
        rounded-sm
        hover:scale-[102%]
        border
        active:scale-[98%]
        border-[#e9e9e9]
        dark:border-[#ffffff1f]
        cursor-pointer
        dark:bg-[#191919]
        bg-[#f1f1f1]
        unselectable">
            {text}
        </div>
    );
}