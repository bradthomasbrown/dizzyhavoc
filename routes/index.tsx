import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div>
      <div class="flex flex-col items-center justify-center overflow-hidden">
        <div class="mb-5 w-[1920px] h-[400px] overflow-hidden flex justify-center items-center">
          <image class="h-[600px] lg:h-auto" src="/dizzyhavoc_eye_3.jpeg"/>
        </div>
        <h1 class="text-4xl font-bold font-mono">dizzyhavoc</h1>
        <p class="font-medium mx-3 my-4 mb-5">
          Upgradeable, machine-coded, multi-chain, DeFi/GameFi ecosystem. New cross-chain web3 library.
        </p>
        <p class="font-[monospace] text-center mb-7">
          Contract Address<br/>
          0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE<br/>
          <a href="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">ETH</a>,&nbsp;
          <a href="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE">AVAX</a>,&nbsp;
          <a href="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">ARB</a>,&nbsp;
          <a href="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">BSC</a>,&nbsp;
          <a href="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">BASE</a>
        </p>
        <div class="flex gap-3 px-[25px] py-[20px] rounded-[100px] bg-gradient-to-r from-[#21191911] to-[#21191928]">
          <a href="https://t.me/dizzyhavoc_portal">
            <img class="w-8 h-8" src="/telegram-mark-black.png"></img>
          </a>
          <a class="pt-1" href="https://discord.gg/XExN8YktHg">
            <img class="w-8 h-6" src="/discord-mark-black.png"></img>
          </a>
          <a class="pt-[2px]" href="https://x.com/dizzyhavoc">
            <img class="w-7 h-7" src="/x-mark-black.png"></img>
          </a>
          <a href="https://github.com/bradbrown-llc/dizzyhavoc">
            <img class="w-8 h-8" src="/github-mark-black.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
}
