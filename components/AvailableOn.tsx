export default function Available() {
  return (
    <div>
      <p class="font-[Poppins] my-4 underline text-[1.1rem] text-center">
        Available on:
        <br />
      </p>
      <div class="flex flex-row mb-2 gap-5 justify-center">
        <a
          target="_blank"
          href="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            src="/eth.svg"
            class="size-11 pl-4 hover:scale-[105%]"
            title="ethereum"
            alt="ethereum"
          />
        </a>
        <a
          target="_blank"
          href="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
        >
          <img
            src="/avax.svg"
            class="size-11 hover:scale-[105%]"
            title="avalanche"
            alt="avalanche"
          />
        </a>
        <a
          target="_blank"
          href="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            src="/arb.svg"
            class="size-11 hover:scale-[105%]"
            title="arbitrum"
            alt="arbitrum"
          />
        </a>
        <a
          target="_blank"
          href="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            src="/bsc.svg"
            class="size-11 hover:scale-[105%]"
            title="binance chain"
            alt="binance chain"
          />
        </a>
        <a
          target="_blank"
          href="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            src="/base.svg"
            class="size-11 hover:scale-[105%]"
            title="base"
            alt="base"
          />
        </a>
      </div>
      <p class="font-[Poppins] text-sm text-center">
        0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE
        <br />
        <br />
      </p>
    </div>
  );
}
