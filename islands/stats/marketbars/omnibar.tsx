import { Signal, useSignal } from "@preact/signals";
import { Values } from "./values.tsx";
import { DummyValues } from "./dummyvalues.tsx";
import { formatNumber } from "../../../lib/common/formatNumber.tsx";

export function Omnibar(props: {
  chain: Signal<string>;
  link: string;
  ico: string;
  initialloading: Signal<boolean>;
  order: Signal<number>;
  tooltip: Signal<boolean>;
  token: Signal<number>;
  h24: Signal<number>;
  liq: Signal<number>;
  vol24: Signal<number>;
  tx: Signal<number>;
  holders: Signal<number>;
  transfers: Signal<number>;
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
   function HandleTooltips() {
    tooltip.value = !tooltip.value;
  }
  function toggleHide() {
    hide.value = !hide.value;
  }
  const hide = useSignal<boolean>(false);
  return (
    <>
      <div
        style={{ order: order != null ? -order : 0 }}
        class={`w-full relative flex sm:h-[9rem] bg-blur3
        border-[2px] border-b-[#bababa5c] border-t-[#bababa5c] border-s-[#bababa5c] border-e-[#bababa5c]
        dark:border-b-[#3636365e] dark:border-s-[#3636365e] dark:border-e-[#3636365e] dark:border-t-[#3636365e]
        ${initialloading.value ? "shimmer2" : ""}
        ${hide.value ? "h-[2.8rem]" : "h-[7.3rem]"}
        ${
          !tooltip.value
            ? "rounded-lg dark:border-b-[#3636365e] border-b-[#bababa5c]"
            : "rounded-t-lg dark:border-b-[#00000000] border-b-[#00000000]"
        }
        `}
      >
        {initialloading.value ? (
          <>
              <div
                draggable={false}
                class="size-[35px] sm:size-[63px] bg-transparent"
              />

            <DummyValues />
          </>
        ) : (
          <>
            <div
              onClick={() => {
                HandleTooltips();
              }}
              class="z-[2] absolute bottom-[0px] cursor-pointer unselectable sm:left-[0.5%] left-[94.1%] dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]"
            >
              {tooltip.value ? (
                <img
                  class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                  src="/svgs/caretup.svg"
                ></img>
              ) : (
                <img
                  class="size-[1.2rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                  src="/svgs/caretdown.svg"
                ></img>
              )}
            </div>
            <div
              onClick={() => {
                toggleHide();
              }}
              class="z-[2] absolute top-[2px] cursor-pointer unselectable visible sm:invisible left-[94.5%] dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]"
            >
              {hide.value ? (
                <img
                  class="size-[1rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                  src="/svgs/plus.svg"
                ></img>
              ) : (
                <img
                  class="size-[1rem] active:scale-[85%] cursor-pointer vignets contrast-0"
                  src="/svgs/minus.svg"
                ></img>
              )}
            </div>
            <a
              draggable={false}
              class="z-[2] vignets2 sm:size-[50px] hover:scale-[105%] sm:ml-3 ml-1 mt-[4px] sm:mt-11 justify-start size-9"
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
              chart={hide}
            />
          </>
        )}
      </div>
      {/* Tooltip */}
      {tooltip.value && (
        <div
          style={{ order: order != null ? -order : 0 }}
          class="sm:h-[1.1rem] h-[1.1rem] -mt-[8px] sm:-mt-2 border-[2px] border-b-[#bababa5c] border-t-[#00000000] border-s-[#bababa5c] border-e-[#bababa5c] dark:border-b-[#3636365e] dark:border-t-[#00000000] dark:border-s-[#3636365e] dark:border-e-[#3636365e] rounded-b-md justify-evenly flex items-center flex-row sm:text-sm text-[11px] px-2 font-[Poppins] w-full bg-blur3"
        >
          <p title={holders.value as unknown as string} class="dark:text-[#d0d0d0] text-[#3d3d3d] unselectable text-[12px]">
            holders: {holders.value ? formatNumber(holders.value) : "0.0K"}
          </p>
          <p title={transfers.value as unknown as string} class="dark:text-[#d0d0d0] text-[#3d3d3d] unselectable text-[12px]">
            transfers:{" "}
            {transfers.value ? formatNumber(transfers.value) : "0.0K"}
          </p>
          <a
            class="text-[#3b2d82] dark:text-[#ccb286]"
            target="_blank"
            href={contract}
          >
            contract
          </a>
          <a
            class="text-[#3b2d82] dark:text-[#ccb286]"
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
