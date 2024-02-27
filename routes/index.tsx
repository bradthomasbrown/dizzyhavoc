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
          Upgradeable, assembly cross-chain token.
        </p>
        <p class="font-[monospace] text-center mb-7">
          Contract Address<br/>
          0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE<br/>
          ETH, AVAX, ARB, BSC, BASE
        </p>
        <div class="flex gap-3 px-[25px] py-[20px] rounded-[100px] bg-gradient-to-r from-[#21191911] to-[#21191928]">
          <a href="https://t.me/dizzyhavoc">
            <img src="/telegram32.png"></img>
          </a>
          <a href="https://twitter.com/dizzyhavoc">
            <img src="/twitter32.png"></img>
          </a>
          <a href="https://github.com/bradbrown-llc/dizzyhavoc">
            <img src="/github32.png"></img>
          </a>
        </div>
      </div>
    </div>
  );
}
