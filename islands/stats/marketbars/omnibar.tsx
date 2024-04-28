import { Signal } from "@preact/signals";
import { Values } from "./values.tsx";
import { formatNumber } from "../../../lib/common/formatNumber.tsx";

export function Omnibar(props: {
  chain: Signal<string>;
  link: string;
  ico: string;
  initialloading: Signal<boolean>;
  order: Signal<number> | null;
  tooltip: Signal<number> | null;
  token: Signal<number> | null;
  h24: Signal<number> | null;
  liq: Signal<number> | null;
  vol24: Signal<number> | null;
  tx: Signal<number> | null;
  holders: Signal<number> | null;
  transfers: Signal<number> | null;
  contract: string;
  trade: string;
}) {
  const {
    chain,
    link,
    ico,
    initialloading,
    order,
    tooltip,
    token,
    h24,
    liq,
    vol24,
    tx,
    holders,
    transfers,
    contract,
    trade,
  } = props;
  async function HandleTooltips() {
    tooltip.value = !tooltip.value;
  }
  return (
    <>
      <div
        style={{ order: order != null ? -order : 0 }}
        class={`w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3 ${
          initialloading.value ? "shimmer" : ""
        }`}
      >
        {initialloading.value ? (
          <></>
        ) : (
          <>
            <div
              onClick={() => {
                HandleTooltips();
              }}
              class="z-[2] absolute bottom-1 cursor-pointer unselectable left-1 dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]"
            >
              {tooltip.value ? (
                <img
                  class="size-4 active:scale-[85%] contrast-0 vignets"
                  src="/misc/minus.svg"
                ></img>
              ) : (
                <img
                  class="size-4 active:scale-[85%] contrast-0 vignets"
                  src="/misc/plus.svg"
                ></img>
              )}
            </div>
            <a
              draggable={false}
              class="z-20 sm:size-[50px] hover:scale-[105%] ml-3 mt-3 sm:mt-11 justify-start size-9"
              title="open in dexscreener"
              target="_blank"
              href={link}
            >
              <img
                draggable={false}
                src={ico}
                title="open in dexscreener"
                alt={chain}
              />
            </a>
            <Values
              chain={chain}
              token={token}
              h24={h24}
              liq={liq}
              vol24={vol24}
              tx={tx}
            />
          </>
        )}
      </div>
      {/* Tooltip */}
      {tooltip.value && (
        <div
          style={{ order: order != null ? -order : 0 }}
          class="sm:h-[1.1rem] h-[0.9rem] rounded-md justify-evenly flex flex-row sm:text-sm text-[11px] -mt-[6px] sm:-mt-1 px-2 font-[Poppins] w-full bg-blur3"
        >
          <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d] unselectable">
            holders: {holders.value ? formatNumber(holders.value) : "0.0K"}
          </p>
          <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d] unselectable">
            transfers:{" "}
            {transfers.value ? formatNumber(transfers.value) : "0.0K"}
          </p>
          <a
            class="flex text-[#3b2d82] dark:text-[#ccb286]"
            target="_blank"
            href={contract}
          >
            contract
          </a>
          <a
            class="flex text-[#3b2d82] dark:text-[#ccb286]"
            target="_blank"
            href={trade}
          >
            trade
          </a>
        </div>
      )}
    </>
  );
}
