import { useSignal } from "@preact/signals";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      
      <div class="flex flex-col items-center justify-center overflow-hidden mb-[5rem]">
       
        <h1 class="lg:text-[5rem] text-[3rem] mt-3 font-bold font-mono">dizzyhavoc</h1>
        <p class="font-medium mx-3 my-4 mb-5">
          Upgradeable, machine-coded, multi-chain, DeFi/GameFi ecosystem. New cross-chain web3 library.
        </p>

        <p class="font-[monospace] text-center">
         Contract: 0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE<br/>
          <br/>
          
          
        </p>
        <div class="flex h-[60px] gap-5">
        <a target="_blank" href="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
          <img title="ethereum" alt="ethereum" className="size-11 hover:scale-[105%]" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg"></img>
            </a>
          <a target="_blank" href="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE">
          <img title="avalanche" alt="avalanche" className="size-11 hover:scale-[105%]" src="https://cryptologos.cc/logos/avalanche-avax-logo.svg"></img>
            </a>
          <a target="_blank" href="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
          <img title="arbitrum" alt="arbitrum" className="size-11 hover:scale-[105%]" src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg"></img>
            </a>
          <a target="_blank" href="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
          <img title="binance chain" alt="binance chain" className="size-11 hover:scale-[105%]" src="https://cryptologos.cc/logos/bnb-bnb-logo.svg"></img>
            </a>
          <a target="_blank" href="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
          <img title="base" alt="base" className="size-11 hover:scale-[105%]" src="https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.svg"></img>
          </a>
        </div>

        <div class="flex gap-3 fixed bottom-5 px-[25px] py-[20px] shadow-lg rounded-[100px] bg-gradient-to-r from-[#21191911] to-[#21191928]">
          <a href="https://t.me/dizzyhavoc_portal">
            <img class="w-8 h-8 hover:scale-[110%]" src="/telegram-mark-black.png"></img>
          </a>
          <a class="pt-1" href="https://discord.gg/XExN8YktHg">
            <img class="w-8 h-6 hover:scale-[110%]" src="/discord-mark-black.png"></img>
          </a>
          <a class="pt-[2px]" href="https://x.com/dizzyhavoc">
            <img class="w-7 h-7 hover:scale-[110%]" src="/x-mark-black.png"></img>
          </a>
          <a href="https://github.com/bradbrown-llc/dizzyhavoc">
            <img class="w-8 h-8 hover:scale-[110%]" src="/github-mark-black.png"></img>
          </a>
        </div>
      </div>
      <div className="w-full h-full absolute z-[-10]">
  <img className="absolute top-0 right-0" style={{ width: "45%" }} src="/dizzyhavoc_eye_3.png" alt="dizzyhavoc eye"></img>
</div>
      
    </div>
  );
}
