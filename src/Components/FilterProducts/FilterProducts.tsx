import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { product } from "../../Interfaces/IproductCard";
import happy from "../../assets/Images/shop/aeb9763b1145b3dd6e2fadd6c2b27941d3d7b0fa-DkOX36JB.png";
type TFilter = {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  products: product[];
};
export default function FilterProducts({ handleFilter, products }: TFilter) {
  //search params
  const [searchParams, setSearchParams] = useSearchParams();
  let categoriesParams = searchParams.getAll("category");
  let brandsPrams = searchParams.getAll("brand");
  let availabilityPrams = searchParams.getAll("availability");
  let [brandsDropDown, setBrandsDropDown] = useState<boolean>(false);
  let allCategories: string[] = [
    "beauty",
    "groceries",
    "laptops",
    "smartphones",
    "perfumes",
    "kitchen-accessories",
    "skin-care",
    "home-decoration",
    "furniture",
    "sunglasses",
    "mobile-accessories",
  ];
  let allBrands: string[] = [
    "IKEA",
    "Essence",
    "Apple",
    "Asus",
    "Huawei",
    "lenovo",
    "Oppo",
    "Samsung",
    "Calvin Klein",
    "Dior",
    "ProVision",
    "EVA",
    "Fashion Shades",
  ];

  let allAvailability: string[] = ["inStock", "outOfStock"];
  function toggleBrands() {
    if (brandsDropDown) {
      setBrandsDropDown(false);
    } else {
      setBrandsDropDown(true);
    }
  }
  return (
    <div className=" text-gray-500">
      {/* categoris */}
      <h3 className="font-semibold  text-black uppercase">
        Products Categories
      </h3>
      <div className=" p-2">
        {allCategories.map((item) => {
          return (
            <div key={item} className="my-5">
              <label
                className="capitalize flex items-center space-x-1"
                htmlFor={item}
              >
                <input
                  className="appearance-none h-4 w-4 bg-slate-50 border border-solid border-gray-300 cursor-pointer rounded-sm checked:bg-main"
                  type="checkbox"
                  name={item}
                  id={item}
                  onChange={(e) => handleFilter(e, "category")}
                  checked={categoriesParams.includes(item)}
                />
                <span>{item}</span>
              </label>
            </div>
          );
        })}
      </div>

      {/* brands */}
      <div
        onClick={toggleBrands}
        className="my-3 flex justify-between items-center cursor-pointer group"
      >
        <h3 className="font-semibold  text-black uppercase   group-hover:underline">
          Brands
        </h3>
        <i
          className={
            brandsDropDown
              ? "fa-solid fa-angle-up text-gray-400"
              : "fa-solid fa-angle-down text-gray-400"
          }
        ></i>
      </div>
      <div className="p-1">
        {brandsDropDown
          ? allBrands.map((item) => {
              return (
                <div className="my-5">
                  <label
                    className="capitalize flex items-center space-x-1"
                    htmlFor={item}
                  >
                    <input
                      className="appearance-none h-4 w-4 bg-slate-50 border border-solid border-gray-300 cursor-pointer rounded-sm checked:bg-main"
                      type="checkbox"
                      name={item}
                      id={item}
                      onChange={(e) => {
                        handleFilter(e, "brand");
                      }}
                      checked={brandsPrams.includes(item)}
                    />
                    <span>{item}</span>
                  </label>
                </div>
              );
            })
          : ""}
      </div>

      {/* price */}
      <h3 className="font-semibold  text-black uppercase">Price</h3>
      <div className="flex items-center justify-evenly my-5">
        <div>
          <label className="text-gray-500" htmlFor="pFrom">
            From
          </label>
          <br />
          <input
            onChange={(e) => {
              handleFilter(e, "priceFrom");
            }}
            className="px-3 w-32 h-14 bg-gray-100 border border-solid border-gray-300 rounded-lg focus:outline-none"
            type="number"
            name="pFrom"
            id="pFrom"
            placeholder="0"
          />
        </div>
        <p>-</p>
        <div>
          <label className="text-gray-500" htmlFor="pTo">
            To
          </label>
          <br />
          <input
            onChange={(e) => {
              handleFilter(e, "priceTo");
            }}
            className="px-3 w-32 h-14 bg-gray-100 border border-solid border-gray-300 rounded-lg"
            type="number"
            name="pForm"
            id="pTo"
            placeholder="0"
          />
        </div>
      </div>

      {/*  Availability*/}
      <h3 className="font-semibold  text-black uppercase">Availability</h3>
      <div className="p-1">
        {allAvailability.map((item) => {
          return (
            <div key={item} className="my-5">
              <label
                className="capitalize flex items-center space-x-1"
                htmlFor={item}
              >
                <input
                  className="appearance-none h-4 w-4 bg-slate-50 border border-solid border-gray-300 cursor-pointer rounded-sm checked:bg-main"
                  type="checkbox"
                  name={item}
                  id={item}
                  onChange={(e) => {
                    handleFilter(e, "availability");
                  }}
                  checked={availabilityPrams.includes(item)}
                />
                <span>
                  {item}(
                  {products.filter((ele) => item === ele.stockstatus).length})
                </span>
              </label>
            </div>
          );
        })}
      </div>
      <div className="my-3">
        <img  src={happy} alt="happy" />
      </div>
    </div>
  );
}
