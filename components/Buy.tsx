import Tokendata from "../islands/tokendata.tsx";
import AvailableOn from "../components/AvailableOn.tsx";
export default function Buy() {
  return (
    <div class="flex xl:flex-row flex-col shadow-lg  mx-auto lg:h-[50rem] h-[55rem] w-full lg:w-[50%] rounded-xl bg-blur">
      <div class="w-full">
        <h1 className="flex col-start-1 text-[1.4rem] underline mt-3 text-center font-[Poppins] flex-col">
          How to buy/ DEXes
        </h1>
        <Tokendata />
        <div class="mt-4 text-[1.5rem]">
          <h1 class="text-[1.2rem] italic font-[Poppins] text-center">
            You'll need a browser wallet, like{" "}
            <a
              class="text-indigo-900"
              target="_blank"
              href="https://metamask.io/"
            >
              Metamask
            </a>{" "}
            or{" "}
            <a class="text-indigo-900" target="_blank" href="https://rabby.io/">
              Rabby
            </a>.
          </h1>
          <h1 class="text-[1.2rem] italic font-[Poppins] text-center">
            An account on CEX to buy Eth, Avax or Bnb. Like{" "}
            <a
              class="text-indigo-900"
              target="_blank"
              href="https://www.binance.com"
            >
              Binance
            </a>,{" "}
            <a class="text-indigo-900" target="_blank" href="https://www.coinbase.com/">
              Coinbase
            </a>{" "}
            or{" "}
            <a class="text-indigo-900" target="_blank" href="https://www.kraken.com/">
              Kraken
            </a>
          </h1>
          <h1 class="text-[1.4rem] text-center"></h1>
          <ul class="sm:ml-0 text-center mt-2 sm:scale-100 scale-75">
            <li>
              Ethereum {">"}{" "}
              <a
                class="text-indigo-900"
                target="_blank"
                href="https://app.uniswap.org/swap?chain=mainnet&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                Uniswap
              </a>
              <a
                href="https://etherscan.io/address/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li>
              Avalanche {">"}{" "}
              <a
                class="text-indigo-900"
                target="_blank"
                href="https://kyberswap.com/swap/avalanche?outputCurrency=0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE&inputCurrency=ETH"
              >
                KyberSwap
              </a>
              <a
                href="https://subnets.avax.network/c-chain/address/0xd1bfb54595ed5346f4fc87eb3813b7793c5a7ead"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li>
              Arbitrum {">"}{" "}
              <a
                class="text-indigo-900"
                target="_blank"
                href="https://app.uniswap.org/swap?chain=arbitrum&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                Uniswap
              </a>
              <a
                href="https://arbiscan.io/address/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li>
              BNB {">"}{" "}
              <a
                class="text-indigo-900"
                target="_blank"
                href="https://pancakeswap.finance/swap?chain=bnb&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                PancakeSwap
              </a>
              <a
                href="https://bscscan.com/address/0x642089a5da2512db761d325a868882ece6e387f5"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
            <li>
              BASE {">"}{" "}
              <a
                class="text-indigo-900"
                target="_blank"
                href="https://app.uniswap.org/#/swap?chain=base&inputCurrency=ETH&outputCurrency=0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
              >
                Uniswap
              </a>
              <a
                href="https://basescan.org/address/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e"
                target="_blank"
                class="text-[1.1rem] text-indigo-900 font-[Poppins] italic"
              >
                {"> "} {"(pool)"}
              </a>
            </li>
          </ul>
        </div>
        <div class="">
          <AvailableOn />
        </div>
      </div>
    </div>
  );
}
