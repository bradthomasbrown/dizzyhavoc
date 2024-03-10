import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";
export default function MenuButton() {
  if(!IS_BROWSER) return <></>;
    const [category, setCategory] = useState('');

    const handleCategoryChange = (category: string) => {
        setCategory(category);
        window.location.pathname = `${category.toLocaleLowerCase()}`;
        setCategory(null);
    }
    return (
        <div>
            <select disabled class="text-2xl text-[#3d3d3d] dark:text-[#e0cdad] text-center w-[180px] shadow-lg font-[Poppins] rounded-lg hover:scale-[102%] border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#191919] bg-[#f1f1f1]" name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
                <option id="0" class="category" value="" selected disabled hidden>{"/{soon}"}</option>
                <option id="1">{"/Bridge"}</option>
                <option id="2">{"/About"}</option>
            </select>
        </div>
    );
}
