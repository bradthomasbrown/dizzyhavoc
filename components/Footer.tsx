export default function Footer() {
  return (
    <footer id="footer" class=" h-[230px] w-full flex flex-row gap-4 justify-center">
      <div class="flex flex-col gap-4 justify-center">
        <div class="flex items-center gap-8">
        <a target="_blank" href="https://t.me/dizzyhavoc_portal">
            <img src="/telegram.png" class="size-8 hover:scale-[110%]" title="telegram" alt="telegram"/>
          </a>
          <a target="_blank" class="pt-1" href="https://discord.gg/stcbzS4KNq">
            <img src="/discord.png" class="w-8 h-6 hover:scale-[110%]" title="discord" alt="discord"/>
          </a>
          <a target="_blank" class="pt-[2px]" href="https://x.com/dizzyhavoc">
            <img src="/x.png" class="size-7 hover:scale-[110%]" title="x" alt="x"/>
          </a>
          <a target="_blank" href="https://github.com/bradbrown-llc/dizzyhavoc">
            <img src="/git.png" class="size-8 hover:scale-[110%]" title="github" alt="github"/>
          </a>
          <a target="_blank" class="pt-[1px]" href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit">
            <img src="/google.png" class="size-8 hover:scale-[110%]" title="whitepaper" alt="whitepaper"/>
          </a>
          <a target="_blank" class="pt-[1px]" href="https://www.coingecko.com/en/coins/dizzyhavoc">
            <img src="/cg.png" class="size-11 hover:scale-[110%]" title="coingecko" alt="coingecko"/>
          </a>
        </div>
        <span class="flex justify-center mt-4">Brad Brown LLC © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
