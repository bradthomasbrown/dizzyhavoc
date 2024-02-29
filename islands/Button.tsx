import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-3 py-2 cursor-pointer bg-[#416390] text-white rounded hover:bg-[#344F73] active:bg-[#293F5C]"
    />
  );
}