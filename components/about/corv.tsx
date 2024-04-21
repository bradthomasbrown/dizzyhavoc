export default function Corv(){
    return(
        <div class="flex mt-[2rem] flex-row">
        <img
          draggable={false}
          class="hover:scale-[101%] active:scale-[100%] size-[65px] sm:size-[115px] rounded-full"
          src="/misc/corv.jpg"
        />
        <div class="flex mx-5 flex-col">
          <h1 class="text-[1.5rem] font-[Poppins] font-medium z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">
            Corvardt
          </h1>
          <h1 class="text-[1.1rem] font-[Poppins] z-10 font-Poppins dark:text-[#d2d2d2] text-[#282828]">
            Front End
          </h1>
          <div class="flex flex-row">
            <a
              draggable={false}
              target="_blank"
              href="https://github.com/corvardt"
              class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]"
            >
              github
            </a>
            <a
              draggable={false}
              target="_blank"
              href="https://twitter.com/covardt"
              class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]"
            >
              twitter
            </a>
            <a
              draggable={false}
              target="_blank"
              href="https://discordapp.com/users/209761949066461194"
              class="text-[1.2rem] ml-2 font-Poppins text-[#3b2d82] dark:text-[#ccb286]"
            >
              discord
            </a>
          </div>
        </div>
      </div>
    )
}