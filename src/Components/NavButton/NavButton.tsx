import React from "react";
type TnavBtnPropss = {
  className: string;
  icon: React.ReactNode;
};
export default function NavButton({ className, icon }: TnavBtnPropss) {
  return (
    <button
      className={`${className} bg-white w-10 h-10 rounded-full shadow-xl text-lg flex items-center justify-center hover:bg-gray-200 duration-500 cursor-pointer z-30 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {icon}
    </button>
  );
}
