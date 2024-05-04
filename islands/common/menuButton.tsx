import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
export default function MenuButton() {
  if (!IS_BROWSER) return <></>;
  const [category, setCategory] = useState<string | null>("");
  const handleCategoryChange = (category: string) => {
    history.pushState(
      "",
      document.title,
      window.location.pathname +
        window.location.search,
    );
    let newCategory = category;
    if (category === "Home") {
      newCategory = "/";
    }
    category = newCategory;
    window.location.pathname = `${newCategory.toLocaleLowerCase()}`;
    setCategory(null);
  };

  return (
    <>
      <div>
        <select
          class="text-2xl unselectable text-[#3d3d3d] dark:text-[#ccb286] outline-none text-center w-[120px] sm:w-[130px] shadow-md font-[Poppins] rounded-lg border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#101010] bg-[#f1f1f1]"
          name="category"
          value={category ? category : ""}
          onChange={(event) => handleCategoryChange(event.currentTarget.value)}
        >
          <option class="category" value="" selected disabled hidden>
            {"Menu"}
          </option>
          <option class="text-[20px]">{"Home"}</option>
          <option class="text-[20px]">{"Stats"}</option>
          <option class="text-[20px]">{"About"}</option>
        </select>
      </div>
    </>
  );
}
