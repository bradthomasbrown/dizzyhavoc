import { IS_BROWSER } from "$fresh/runtime.ts";
import Button from "../common/Button.tsx";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function MenuBar() {
  if (!IS_BROWSER) return <></>;
 
  return (
    <>
          <div class="shadow-lg min-w-screen max-w-[30rem] rounded-lg gap-0 xl:gap-1 bg-blur3 flex flex-row">
            <Button> Markets </Button> 
            <Button> Fees </Button> 
            <Button> Volume </Button> 
            <Button> Misc </Button> 
          </div>
        </>

  );
}