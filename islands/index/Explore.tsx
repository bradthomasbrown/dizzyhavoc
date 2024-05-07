export function Explore(props : {text:string }) {
  const text = props.text
    return (
        <div className="
        sm:text-3xl
        text-2xl
        text-[#3f3f3f]
        dark:text-[#bebebe]
        w-[110px]
        h-[35px]
        sm:h-[40px]
        sm:w-[160px]
        text-center
        shadow-lg font-[Poppins]
        rounded-md
        hover:scale-[102%]
        active:scale-[98%]
        border-[2px]
        border-[#e9e9e9] 
        dark:border-[#ffffff1f]
        cursor-pointer
        bg-blur
        unselectable">
        {text}
        </div>
    );
}