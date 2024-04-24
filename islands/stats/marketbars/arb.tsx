import { ArbChart } from "../charts/mod.ts";
import { Signal } from "@preact/signals";
import { formatNumber } from "../../../lib/common/formatNumber.tsx";
export function Arb(props: {
  token_arb: Signal<number>;
  h24_arb: Signal<number>;
  liq_arb: Signal<number>;
  vol24_arb: Signal<number>;
  tx_arb: Signal<number>;
}) {
  const { token_arb, h24_arb, liq_arb, vol24_arb, tx_arb } = props;
  return (
    <div class="flex items-start sm:items-center flex-row">
      <div class="z-[1] flex gap-3 sm:gap-0 mx-3 sm:flex-col flex-row">
        <div class="flex sm:flex-row flex-col">
          <section class="rounded flex sm:flex-row flex-col w-full py-[1px] ml-0">
            <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">
              ${formatNumber(token_arb.value)}
            </h1>
            <h1
              title="24h price change"
              class={`font-[Poppins] unselectable font-medium text-[0.7rem] ml-1 sm:text-[0.7rem] inline ${
                h24_arb.value < 0 ? "text-[#a23535]" : "text-[#4da235]"
              }`}
            >
              {h24_arb.value}%
            </h1>
          </section>
        </div>
        <div class="sm:shadow-none shadow-md mt-1 sm:mt-0 rounded-md">
          <div class="flex sm:flex-row flex-col">
            <section class="rounded flex sm:flex-row flex-col mx-auto w-full items-center">
              <h2 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] sm:text-start text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                Liquidity:{" "}
              </h2>
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] sm:text-[1rem] inline">
                ${formatNumber(liq_arb.value)}
              </h1>
            </section>
          </div>
        </div>
        <div class="sm:shadow-none shadow-md mt-1 sm:mt-0 rounded-md">
          <div class="flex flex-row sm:flex-col">
            <section class="rounded flex sm:flex-row flex-col mx-auto w-full items-center">
              <h2 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] sm:text-start text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                24h Vol:{" "}
              </h2>
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] sm:text-[1rem] inline">
                ${formatNumber(vol24_arb.value)}
              </h1>
            </section>
          </div>
        </div>
        <div class="sm:shadow-none shadow-md mt-1 sm:mt-0 rounded-md">
          <div class="flex flex-row sm:flex-col">
            <section class="rounded flex sm:flex-row flex-col mx-auto w-full items-center">
              <h2 class="unselectable font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] sm:text-start text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
                24h Tx:{" "}
              </h2>
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] sm:text-[1rem] inline">
                {Number(formatNumber(tx_arb.value)).toFixed(0)}
              </h1>
            </section>
          </div>
        </div>
      </div>
      <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
        <ArbChart />
      </div>
    </div>
  );
}
