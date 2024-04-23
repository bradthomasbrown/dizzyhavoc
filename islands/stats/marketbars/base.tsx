import { BaseChart } from "../charts/mod.ts";
import { Signal } from "@preact/signals";
import { formatNumber } from "../../../lib/common/formatNumber.tsx";
export function Base(props: {
  token_base: Signal<number>;
  h24_base: Signal<number>;
  liq_base: Signal<number>;
  vol24_base: Signal<number>;
  tx_base: Signal<number>;
}) {
  const { token_base, h24_base, liq_base, vol24_base, tx_base } = props;
  return (
    <div class="flex items-start sm:items-center flex-row">
      <div class="flex gap-3 sm:gap-0 mx-3 sm:flex-col flex-row">
        <div class="flex sm:flex-row flex-col">
          <section class="rounded flex sm:flex-row flex-col w-full py-[1px] ml-0">
            <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">
              ${formatNumber(token_base.value)}
            </h1>
            <h1
              title="24h price change"
              class={`font-[Poppins] unselectable font-medium text-[0.7rem] ml-1 sm:text-[0.7rem] inline ${
                h24_base.value < 0 ? "text-[#a23535]" : "text-[#4da235]"
              }`}
            >
              {h24_base.value}%
            </h1>
          </section>
        </div>
        <div class="flex sm:flex-row flex-col">
          <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
            <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
              Liquidity:{" "}
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] inline">
                ${formatNumber(liq_base.value)}
              </h1>
            </h2>
          </section>
        </div>
        <div class="flex flex-row sm:flex-col">
          <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
            <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
              24h Vol:{" "}
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] inline">
                ${formatNumber(vol24_base.value)}
              </h1>
            </h2>
          </section>
        </div>
        <div class="flex flex-row sm:flex-col">
          <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
            <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
              24h Tx:{" "}
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] inline">
                {Number(formatNumber(tx_base.value)).toFixed(0)}
              </h1>
            </h2>
          </section>
        </div>
      </div>
      <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
        <BaseChart />
      </div>
    </div>
  );
}
