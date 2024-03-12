import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
export default function MenuButton() {
  if(!IS_BROWSER) return <></>;
    let category = useSignal<string>('');

    const handleCategoryChange = (category: string) => {
        history.pushState("", document.title, window.location.pathname
        + window.location.search);
        let newCategory = category;
        if (category === '/Home') {
            newCategory = '/';
        }
        window.location.pathname = `${newCategory.toLocaleLowerCase()}`;
        category = "";
    }
    
    return (
        <div>
            <select class="text-2xl text-[#3d3d3d] dark:text-[#e0cdad] text-center w-[180px] shadow-lg font-[Poppins] rounded-lg hover:scale-[102%] border border-[#e9e9e9] dark:border-[#ffffff1f] cursor-pointer dark:bg-[#191919] bg-[#f1f1f1]" name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
                <option  class="category" value="" selected disabled hidden>{"/{menu}"}</option>
                <option >{"/Home"}</option>
                <option >{"/Stats"}</option>
                {/* <option >{"/Bridge"}</option> */}
                <option >{"/Bridge"}</option>
                <option>{"/About"}</option>
            </select>
        </div>
    );
}
