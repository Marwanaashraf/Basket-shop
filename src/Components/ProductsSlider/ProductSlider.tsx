import React, { useEffect } from "react";
import FilterProducts from "../FilterProducts/FilterProducts";
import { product } from "../../Interfaces/IproductCard";
type TFilter = {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  products: product[];
  setToggle:React.Dispatch<React.SetStateAction<boolean>>
};

export default function ProductSlider({ handleFilter, products ,setToggle}: TFilter) {

  return (
    <div className="filter-slider fixed top-0 left-0 right-0 bottom-0 z-[800] ">
      <div className="relative bg-white w-[75%] sm:w-[60%] md:w-[50%] h-screen overflow-auto">
        <div className=" p-3 my-10">
          <FilterProducts products={products} handleFilter={handleFilter} />
        </div>

        <div onClick={()=>{setToggle(false)}} className="absolute top-2 right-3 cursor-pointer">
          <i className="fa-solid fa-x"></i>
        </div>
      </div>
    </div>
  );
}
