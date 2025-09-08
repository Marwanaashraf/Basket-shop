import React from "react";
import { ICategoriesBtn } from "../../Interfaces/CategoriesBtn";
export default function CategoriesBtn({
  isCategories,
  setIsCategories,
  dropDown,
}: ICategoriesBtn) {
  return (
    <div className="relative">
      <div
        onClick={() => {
          dropDown(isCategories, setIsCategories);
        }}
        className="bg-main w-56 h-14 rounded-full flex justify-evenly items-center text-white cursor-pointer"
      >
        <i className="fa-solid fa-bars"></i>
        <h3 className="font-semibold text-lg uppercase">All Categories</h3>
        <i className="fa-solid fa-angle-down text-base"></i>
      </div>
      <div className="absolute -bottom-2 left-5 bg-slate-200 w-32 h-5 rounded-full flex items-center justify-center">
        <p className="text-xs text-slate-500 uppercase font-semibold">
          Total 50 products
        </p>
      </div>
      {isCategories ? (
        <div className="absolute top-[70px] w-40 md:w-56 h-96 bg-white shadow-lg border border-solid border-gray-200 rounded-lg flex flex-col justify-evenly p-2 overflow-auto">
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
          <h3 className="hover:bg-gray-100 transition-all duration-300 cursor-pointer p-1 rounded-sm font-semibold">
            Beauty
          </h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
