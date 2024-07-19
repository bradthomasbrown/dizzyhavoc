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
        tracking-tight
        shadow-lg font-[Poppins]
        rounded-md
        hover:scale-[102%]
        active:scale-[98%]
        border
        dark:border-[#c5c5c589] 
        border-[#6161617a]
        bg-gradient-to-r
        from-[#f1f1f180]
        dark:from-[#19191980] 
        dark:via-[#191919] 
        via-[#f1f1f1]
        to-[#f1f1f180]
        dark:to-[#19191980] 
        cursor-pointer
        unselectable">
        {text}
        </div>
    );
}