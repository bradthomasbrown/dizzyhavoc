import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect, useRef } from "preact/hooks";

export default function MenuButton() {
  if (!IS_BROWSER) return <></>;

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleCategoryChange = (category: string) => {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search,
    );
    let newCategory = category;
    if (category === "Home") {
      newCategory = "/";
    }
    window.location.pathname = `${newCategory.toLocaleLowerCase()}`;
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} class="relative">
      <button
        class="flex items-center justify-center gap-1.5 text-2xl unselectable text-[#3d3d3d] dark:text-[#ccb286] outline-none text-center w-[120px] sm:w-[130px] shadow-md font-[Poppins] rounded-lg border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#101010] bg-[#f1f1f1] hover:brightness-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu <img class="dark:invert invert-0 pt-0.5" src="/svgs/caretdown.svg" width="24" height="24" />
      </button>

      <ul
        class={`absolute z-[10] left-0 mt-2 w-[120px] sm:w-[130px] bg-white dark:bg-[#101010] rounded-lg shadow-lg border border-[#e9e9e9] dark:border-[#ffffff1f] transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <li
          class="rounded-t-[7px] cursor-pointer text-center py-2 hover:bg-[#f1f1f1] dark:hover:bg-[#333] text-[#3d3d3d] dark:text-[#ccb286] transition-colors"
          onClick={() => handleCategoryChange("Home")}
        >
          Home
        </li>
        <li
          class="cursor-pointer text-center py-2 hover:bg-[#f1f1f1] dark:hover:bg-[#333] text-[#3d3d3d] dark:text-[#ccb286] transition-colors"
          onClick={() => handleCategoryChange("Stats")}
        >
          Stats
        </li>
        <li
          class="rounded-b-[7px] cursor-pointer text-center py-2 hover:bg-[#f1f1f1] dark:hover:bg-[#333] text-[#3d3d3d] dark:text-[#ccb286] transition-colors"
          onClick={() => handleCategoryChange("About")}
        >
          About
        </li>
      </ul>
    </div>
  );
}
