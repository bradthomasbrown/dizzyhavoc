export function Noise() {
  return (
    <div class="size-full absolute z-[-1]">
      <div class="mask top-0 sm:h-[10%] h-[7%] absolute w-full bg-gradient-to-t from-transparent to-[#ededed] dark:to-[#101010]"></div>
      <div class="mask bottom-0 sm:h-[10%] h-[7%] absolute w-full bg-gradient-to-b from-transparent to-[#ededed] dark:to-[#101010]"></div>
      <div
        class="
    dark:bg-[url('/misc/noise.png')]
    bg-[url('/misc/whitenoise.png')]
        opacity-35
        dark:opacity-20
        bg-repeat
        size-full
        absolute 
        z-[-1]"
      />
    </div>
  );
}
