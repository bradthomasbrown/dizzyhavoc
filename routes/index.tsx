import Tokendata  from "../islands/tokendata.tsx";
export default function Home() {
  return (
    <div class="w-screen h-screen flex justify-center items-center">
      <div class="flex flex-col items-center justify-center overflow-hidden mb-[5rem]">
        <h1 class="lg:text-[5rem] text-[3rem] mt-3 font-bold font-mono">dizzyhavoc</h1>
        <p class="font-medium italic text-[1.3rem] mx-3 my-4 mb-5">
          Upgradeable, machine-coded, multi-chain, DeFi/GameFi ecosystem. New cross-chain web3 library.
        </p>
        <div class="flex sm:flex-row flex-col gap-3 px-[40px] py-[15px] md:w-[95%] w-full shadow-lg rounded-lg sm:rounded-[100px] bg-gradient-to-r from-[#21191911] to-[#21191928]">
          <div class="flex flex-col items-center justify-center">
          <p class="font-[monospace] underline  text-[1.1rem] text-center mb-[-15px]  mt-2">
         Available on:<br/>
          <br/>
        </p>
        <div class="flex flex-row gap-5 ">
          <a target="_blank" href="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
            <img src="/eth.svg" class="size-11 pl-4 hover:scale-[105%]" title="ethereum" alt="ethereum"/>
          </a>
          <a target="_blank" href="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE">
            <img src="/avax.svg" class="size-11 hover:scale-[105%]" title="avalanche" alt="avalanche"/>
          </a>
          <a target="_blank" href="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
            <img src="/arb.svg" class="size-11 hover:scale-[105%]" title="arbitrum" alt="arbitrum"/>
          </a>
          <a target="_blank" href="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
            <img src="/bsc.svg" class="size-11 hover:scale-[105%]" title="binance chain" alt="binance chain"/>
          </a>
          <a target="_blank" href="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">
            <img src="/base.svg" class="size-11 hover:scale-[105%]" title="base" alt="base"/>
          </a>
          </div>
          <p class="font-[monospace] mt-2 text-center">
         Contract: 0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE<br/>
          <br/>
          </p>
          </div>
           <Tokendata />
        </div> 
        <div class="flex gap-3 sm:fixed absolute bottom-5 px-[25px] py-[20px] shadow-lg rounded-[100px] bg-gradient-to-r from-[#21191911] to-[#21191928]">
          <a target="_blank" href="https://t.me/dizzyhavoc_portal">
            <img src="/telegram.png" class="size-8 hover:scale-[110%]" title="telegram" alt="telegram"/>
          </a>
          <a target="_blank" class="pt-1" href="https://discord.gg/XExN8YktHg">
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
        </div>
      </div>
      <div className="w-full h-full absolute z-[-10]">
        <img className="absolute top-0 right-0 w-[45%]" src="/dzhv.png" alt="dizzyhavoc eye"></img>
      </div>
    </div>
  );
}