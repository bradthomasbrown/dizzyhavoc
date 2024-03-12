import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
export default function MenuButton() {
  if(!IS_BROWSER) return <></>;
    let [category, setCategory] = useState<string>('');
    const handleCategoryChange = (category: string) => {
        history.pushState("", document.title, window.location.pathname
        + window.location.search);
        let newCategory = category;
        if (category === '/Home') {
            newCategory = '/';
        }
        category = newCategory;
        window.location.pathname = `${newCategory.toLocaleLowerCase()}`;
        setCategory(null);
    }
    
    return (
        <div>
            <select class="text-2xl text-[#3d3d3d] dark:text-[#e0cdad] text-center w-[150px] shadow-lg font-[Poppins] rounded-lg hover:scale-[102%] border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#191919] bg-[#f1f1f1]" name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
                <option  class="category" value="" selected disabled hidden>{"/{menu}"}</option>
                <option >{"/Home"}</option>
                <option >{"/Stats"}</option>
                {/* <option >{"/Bridge"}</option> */}
                <option>{"/About"}</option>
            </select>
        </div>
    );
}
