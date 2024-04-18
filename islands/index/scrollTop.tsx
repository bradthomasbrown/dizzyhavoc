export function ScrollTop() {
  function Scroll() {
    const navbarElement = globalThis.document
      ? globalThis.document.getElementById("navbar")
      : null;
    navbarElement && navbarElement.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div onClick={() => Scroll()}>
      <div class="cursor-pointer active:scale-[98%]">
        <img
          draggable={false}
          src="/misc/arrowup.svg"
          alt=""
          class="h-[40px] w-[40px] contrast-[0.3] invert-0 dark:invert"
        />
      </div>
    </div>
  );
}
