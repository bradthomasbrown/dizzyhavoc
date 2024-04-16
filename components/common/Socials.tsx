export default function Social() {
  return (
    <div>
      <a
        draggable={false}
        class="bottom-0"
        target="_blank"
        href="https://linktr.ee/dizzyhavoc"
      >
        <div className="text-lg text-gray-800 dark:text-gray-200 px-1 sm:pr-2 pr-1 dark:bg-[#101010] text-center w-full shadow-md dark:shadow-gray-800 shadow-gray-300 bg-[#f1f1f1] font-[Poppins] rounded-lg hover:scale-105 dark:border-gray-28 dark:border z-20 border-gray-100 cursor-pointer">
          <span>🌐</span>
          <span className="sm:inline-block hidden">Socials</span>
        </div>
      </a>
    </div>
  );
}
