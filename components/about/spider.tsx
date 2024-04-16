export default function Spider(){
    return(
        <div class="flex mt-[2rem] flex-row">
        <img
          draggable={false}
          class="hover:scale-[101%] size-[70px] sm:size-[120px] rounded-full"
          src="/misc/spider.png"
        />
        <div class="flex mx-5 flex-col">
          <h1 class="text-[1.7rem] font-[Poppins] font-medium z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">
            Brad Brown
          </h1>
          <h1 class="text-[1.1rem] font-[Poppins] z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">
            Creator, Lead Developer, Full-Stack
          </h1>
          <div class="flex flex-row">
            <a
              draggable={false}
              target="_blank"
              href="https://github.com/bradbrown-llc"
              class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]"
            >
              github
            </a>
            <a
              draggable={false}
              target="_blank"
              href="https://twitter.com/dzhv_io"
              class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]"
            >
              twitter
            </a>
            <a
              draggable={false}
              target="_blank"
              href="https://discordapp.com/users/1173062401621504063"
              class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]"
            >
              discord
            </a>
          </div>
        </div>
      </div>
    )
}