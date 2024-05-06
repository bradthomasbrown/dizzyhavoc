export default function Available() {
  return (
    <div>
      <div class="flex sm:flex-col flex-row gap-7 invisible sm:visible justify-center items-center">
        <a
          draggable={false}
          target="_blank"
          href="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            draggable={false}
            src="/chains/eth.svg"
            class="h-[40px] hover:scale-[105%]"
            title="ethereum"
            alt="ethereum"
          />
        </a>
        <a
          draggable={false}
          target="_blank"
          href="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE"
        >
          <img
            draggable={false}
            src="/chains/avax.svg"
            class="size-[40px] hover:scale-[105%]"
            title="avalanche"
            alt="avalanche"
          />
        </a>
        <a
          draggable={false}
          target="_blank"
          href="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            draggable={false}
            src="/chains/arb.svg"
            class="size-[40px] hover:scale-[105%]"
            title="arbitrum"
            alt="arbitrum"
          />
        </a>
        <a
          draggable={false}
          target="_blank"
          href="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            draggable={false}
            src="/chains/bsc.svg"
            class="size-[40px] hover:scale-[105%]"
            title="binance chain"
            alt="binance chain"
          />
        </a>
        <a
          draggable={false}
          target="_blank"
          href="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe"
        >
          <img
            draggable={false}
            src="/chains/base.svg"
            class="size-[40px] hover:scale-[105%]"
            title="base"
            alt="base"
          />
        </a>
      </div>
    </div>
  );
}
