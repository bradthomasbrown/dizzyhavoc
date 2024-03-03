import Tokendata  from "../islands/tokendata.tsx";
export default function Home() {
  return (
    <div class="w-full h-screen flex justify-center">
      <div class="flex flex-col items-center mb-[5rem]">
        <h1 class="lg:text-[8rem] text-[3rem] mt-[5rem] underline font-bold font-mono">dizzyhavoc</h1>
        <p class="font-medium italic text-[1.3rem] w-screen sm:w-[100%] mt-[0.5rem] bg-blur rounded-xl px-2 mb-[5rem]">
          Upgradeable, machine-coded, multi-chain, DeFi/GameFi ecosystem. New cross-chain web3 library.
        </p>
         <Tokendata />
        <div class="flex sm:flex-row flex-col justify-center w-screen sm:w-[100%] mt-[5rem] gap-9 py-[15px] rounded-xl px-0 sm:px-[5rem] bg-blur">
          <div class="flex flex-col">
          <p class="font-[monospace] underline text-[1.1rem] text-center mb-[-15px]">
         Available on:<br/>
          <br/>
        </p>
        <div class="flex flex-row gap-5 justify-center">
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
         0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE<br/>
          <br/>
          </p>
          </div>
          <div class="flex flex-col sm:ml-[50px]  items-center ml-0 ">
          <p class="font-[monospace] underline flex  text-[1.1rem] text-center mb-[-15px] mt-2">
            Stage 1 progress:<img
              title="see page 8 of litepaper for more infos."
              class="size-[20px] flex mt-1 mx-1 hover:scale-110"
              src="/help.png"
            ></img><br/> 
          <br/>
        </p>
        <div class="flex scale-125 flex-row  justify-center">
        <ol class="flex items-center gap-4 text-center  w-full text-xs text-gray-900 font-medium sm:text-base">
 	<li class="flex w-full relative text-indigo-600  after:content-['']  after:w-full after:h-0.5  after:bg-indigo-100 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
 		<div class="block whitespace-nowrap z-10">
 			<span class="w-6 h-6 bg-gray-50 border-4 border-indigo-800 rounded-full flex  justify-center items-center mx-auto mb-3 text-[6px] text-sm text-indigo-800 lg:w-8 lg:h-8">I</span>
 		</div>
 	</li>
 	<li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
 		<div class="block whitespace-nowrap z-10">
 			<span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-gray-900 lg:w-8 lg:h-8">II</span>
 		</div>
 	</li>
 	<li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5  after:top-3 after:left-4">
 		<div class="block whitespace-nowrap z-10">
 			<span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-8 lg:h-8">III</span>
 		</div>
 	</li>
 	<li class="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
 		<div class="block whitespace-nowrap z-10">
 			<span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-8 lg:h-8">IV</span>
 		</div>
 	</li>
 	<li class="flex w-full relative text-gray-900  ">
 		<div class="block whitespace-nowrap z-10">
 			<span class="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-8 lg:h-8">V</span>
 		</div>
 	</li>
 </ol>
          </div>
          <p class="font-[monospace] mt-2 text-center">
         litepaper: <a class="text-indigo-600" href="https://docs.google.com/document/d/1HK-X5rmBqlDGgu5w3GbfYTaGQ7UwjgWm3WPd4_ei5BE/edit" target="_blank">doc</a><br/>
          <br/>
          </p>
          </div>
        </div> 
      </div>
      <div className="w-full h-full absolute z-[-10]">
        <img className="absolute top-4 left-4 w-[5%]" src="/dzhv-art.jpg" alt="dizzyhavoc eye"></img>
        <img className="absolute top-0 right-0 w-[45%]" src="/dzhv.png" alt="dizzyhavoc eye"></img>
      </div>
    </div>
  );
}