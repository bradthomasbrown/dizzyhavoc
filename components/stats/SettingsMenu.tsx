import { Signal } from "@preact/signals";
export const hidden = new Signal(true);
export const fetchmode = new Signal("default");
export const sortby = new Signal("price");
export function SettingsMenu() {
  return (
    <div
      class={`
        ${hidden.value ? "hidden" : ""}
        z-[100]
        absolute
        flex-col
        top-full right-0
        flex gap-1
        border
        border-[#d0d0d0]
        dark:border-[#3d3d3d]
        bg-[#ededed] dark:bg-[#191919]
        shadow-xl rounded-xl
        p-2
        w-[7.345rem]
      `}
    >
      <div class="">
        <div class="text-[14px] unselectable dark:text-[#d0d0d0] text-[#3d3d3d] bold font-[Poppins]">
          fetch mode
        </div>
        <select
          class="text-sm unselectable dark:text-[#d0d0d0] text-[#3d3d3d] outline-none text-center w-[100px] font-[Poppins] rounded-md border border-[#d0d0d0] dark:border-[#3d3d3d] cursor-pointer dark:bg-[#101010] bg-[#f1f1f1]"
          name="mode"
          value={fetchmode.value ? fetchmode.value : "default"}
          onChange={(event) => (fetchmode.value = event.currentTarget.value)}
        >
          <option class="text-sm">{"default"}</option>
          <option class="text-sm">{"faster"}</option>
          <option class="text-sm">{"realtime"}</option>
        </select>
      </div>
      <div class="">
        <div class="text-[14px] unselectable dark:text-[#d0d0d0] text-[#3d3d3d] bold font-[Poppins]">
          sort by
        </div>
        <select
          class="text-sm unselectable dark:text-[#d0d0d0] text-[#3d3d3d] outline-none text-center w-[100px] font-[Poppins] rounded-md border border-[#d0d0d0] dark:border-[#3d3d3d] cursor-pointer dark:bg-[#101010] bg-[#f1f1f1]"
          name="sort"
          value={sortby.value ? sortby.value : "price"}
          onChange={(event) => (sortby.value = event.currentTarget.value)}
        >
          <option class="text-sm">{"price"}</option>
          <option class="text-sm">{"liquidity"}</option>
          <option class="text-sm">{"volume"}</option>
          <option class="text-sm">{"txn"}</option>
          <option class="text-sm">{"24h"}</option>
        </select>
      </div>
    </div>
  );
}
