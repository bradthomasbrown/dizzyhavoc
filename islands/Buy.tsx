import TokenData from "./tokendata.tsx";
import Button from  "./Button.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Buy() {
  if(!IS_BROWSER) return <></>;
  function togglehelp(){
    globalThis.document.getElementById("helpbox")?.classList.toggle("invisible")
  }
  // Function to toggle the visibility of the helpbox
  return (
    <>
      <div class="w-full mb-[20vh]">
        <p class="font-medium italic text-[1.7rem] unselectable sm:text-[2.5rem] text-center dark:text-[#d0d0d0] text-[#3d3d3d] mx-auto font-[Poppins] shadow-lg mt-[0.5rem] py-3 bg-blur2 lg:max-w-[32rem] max-w-full rounded-xl px-6 mb-[1rem]">
          Exchanges/ Chains.
        </p>
        <div class="flex xl:flex-row flex-col pb-1 sm:pb-7 h-full shadow-lg mx-auto min-w-full xl:min-w-[50rem] max-w-[70rem] xl:max-w-[55rem] rounded-xl bg-blur2">
          <div id="helpbox" class="flex h-[160%] xl:h-[100%] shadow-lg absolute invisible z-50 min-w-full min-h-full rounded-xl bg-[#ededed] dark:bg-[#191919]"> {/* Help box */}
          <div class="w-full p-4 sm:p-9">
            <div class=" text-[1.5rem]">
            <div class="mt-4 text-[1.5rem]">
          <h1 class="text-[1.2rem] dark:text-[#d2d2d2] italic font-[Poppins] text-center">
            To buy you'll need a browser wallet, like{" "}
            <a
              class="text-indigo-900 dark:text-[#e0cdad]"
              target="_blank"
              href="https://metamask.io/"
            >
              Metamask
            </a>{" "}
            or{" "}
            <a class="text-indigo-900 dark:text-[#e0cdad]" target="_blank" href="https://rabby.io/">
              Rabby.
            </a>
          </h1>
          <h1 class="text-[1.2rem] dark:text-[#d2d2d2] italic font-[Poppins] text-center">
            An account on CEX to buy Eth, Avax or Bnb. Like{" "}
            <a
              class="text-indigo-900 dark:text-[#e0cdad]"
              target="_blank"
              href="https://www.binance.com"
            >
              Binance
            </a>,{" "}
            <a class="text-indigo-900 dark:text-[#e0cdad]" target="_blank" href="https://www.coinbase.com/">
              Coinbase
            </a>{" "}
            or{" "}
            <a class="text-indigo-900 dark:text-[#e0cdad]" target="_blank" href="https://www.kraken.com/">
              Kraken.
            </a>
          </h1>
          <h1 class="text-[1.05rem] dark:text-[#d2d2d2] italic font-[Poppins] text-center">
            Or you can buy directly on centralized exchange :{" "}
            <a
              class="text-indigo-900 dark:text-[#e0cdad]"
              target="_blank"
              href="https://poloniex.com/trade/DZHV_USDT/?type=spot"
            >
              Poloniex.
            </a>{" (Not your keys, not your coins!)"}
          </h1>
          <h1 class="text-[1.4rem] dark:text-[#d2d2d2] text-center"></h1>
          <ul class="sm:ml-0 text-center mt-2 sm:scale-100 scale-75">
            <li class="dark:text-[#d2d2d2]">
              Ethereum {">"}{" "}
              <a
                class="text-indigo-900 dark:text-[#e0cdad]"
                target="_blank"
                href="https://app.uniswap.org/swap?chain=mainnet&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                Uniswap
              </a>
              <a
                href="https://etherscan.io/address/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 dark:text-[#e0cdad] font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li class="dark:text-[#d2d2d2]">
              Avalanche {">"}{" "}
              <a
                class="text-indigo-900 dark:text-[#e0cdad]"
                target="_blank"
                href="https://kyberswap.com/swap/avalanche?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&inputCurrency=ETH"
              >
                KyberSwap
              </a>
              <a
                href="https://subnets.avax.network/c-chain/address/0x523A04633b6C0c4967824471ddA0AbbcE7c5e643"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 dark:text-[#e0cdad] font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li class="dark:text-[#d2d2d2]">
              Arbitrum {">"}{" "}
              <a
                class="text-indigo-900 dark:text-[#e0cdad]"
                target="_blank"
                href="https://app.uniswap.org/swap?chain=arbitrum&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                Uniswap
              </a>
              <a
                href="https://arbiscan.io/address/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 dark:text-[#e0cdad] font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li class="dark:text-[#d2d2d2]">
              BNB {">"}{" "}
              <a
                class="text-indigo-900 dark:text-[#e0cdad]"
                target="_blank"
                href="https://pancakeswap.finance/swap?chain=bnb&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                PancakeSwap
              </a>
              <a
                href="https://bscscan.com/address/0x642089a5da2512db761d325a868882ece6e387f5"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 dark:text-[#e0cdad] font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li class="dark:text-[#d2d2d2]">
              BASE {">"}{" "}
              <a
                class="text-indigo-900 dark:text-[#e0cdad]"
                target="_blank"
                href="https://app.uniswap.org/#/swap?chain=base&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                Uniswap
              </a>
              <a
                href="https://basescan.org/address/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 dark:text-[#e0cdad] font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
          </ul>
        </div>
              <Button addClass="text-[1rem] translate-x-[-50%] left-[50%] flex justify-center absolute bottom-3 p-0" onclick={togglehelp}>Close</Button>
            </div>
          </div>
          </div>  {/* end Help box */}
          <div class="w-full p-4 sm:p-9">
            <TokenData />
            <div class="mt-4 text-[1.5rem]">
              <Button addClass="text-[1rem] mx-auto bottom-3 p-0" onclick={togglehelp}>Basics/ Pools info</Button>
            </div>
          </div>
        </div>
        <div className="absolute z-[-10]">
          <img
            className="bottom-2 left-4 blur-lg w-[25%]"
            src="/dzhv.png"
            alt="dizzyhavoc eye"
          >
          </img>
        </div>
      </div>
    </>
  );
}
