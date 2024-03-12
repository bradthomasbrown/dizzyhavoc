import { JSX } from "preact";

export default function Button(props:{ addClass?:string }&JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`
      text-2xl
      text-[#3d3d3d]
      dark:text-[#d7d7d7]
      text-center w-[180px]
      shadow-lg font-[Poppins]
      rounded-lg
      hover:scale-[102%]
      border
      border-[#e9e9e9]
      dark:border-[#ffffff1f]
      cursor-pointer
      dark:bg-[#191919]
      bg-[#f1f1f1]
      ${props.addClass}
      `}
    />
  );
}