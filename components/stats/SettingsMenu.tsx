import { Signal } from "@preact/signals";
export const hidden = new Signal(true);
export const fetchmode = new Signal("normal");
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
        bg-[#ededed] dark:bg-[#191919]
        shadow-xl rounded-xl
        p-2
        w-[7.2rem]
      `}
    >
        <div class="">
        <div class="text-[14px] bold font-[Poppins]">fetch mode</div>
        <select
          class="text-sm unselectable text-[#3d3d3d] dark:text-[#ccb286] outline-none text-center w-[100px] shadow-lg font-[Poppins] rounded-lg border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#101010] bg-[#f1f1f1]"
          name="mode"
          value={fetchmode.value ? fetchmode.value : "normal"}
          onChange={(event) => fetchmode.value = event.currentTarget.value}
        >
          <option class="text-sm">{"normal"}</option>
          <option class="text-sm">{"fast"}</option>
          <option class="text-sm">{"realtime"}</option>
        </select>
        </div>
        <div class="">
        <div class="text-[14px] bold font-[Poppins]">sort by</div>
        <select
          class="text-sm unselectable text-[#3d3d3d] dark:text-[#ccb286] outline-none text-center w-[100px] shadow-lg font-[Poppins] rounded-lg border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#101010] bg-[#f1f1f1]"
          name="sort"
          value={sortby.value ? sortby.value : "price"}
          onChange={(event) => sortby.value = event.currentTarget.value}
        >
          <option class="text-sm">{"price"}</option>
          <option class="text-sm">{"liquidity"}</option>
          <option class="text-sm">{"volume"}</option>
        </select>
        </div>

    </div>
  );
}