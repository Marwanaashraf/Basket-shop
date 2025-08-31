import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "../../Apis/getProducts";
import { useSearchParams } from "react-router-dom";
import bgShop from "../../assets/Images/bgShop-CugBvGr8.png";
import { product } from "../../Interfaces/IproductCard";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
export default function Shop() {
  //search params
  const [searchParams, setSearchParams] = useSearchParams();
  let categoriesParams = searchParams.getAll("category");
  let brandsPrams = searchParams.getAll("brand");
  //filter products
  let products = useRef<product[]>([]);
  let [isLoading, setLoading] = useState<boolean>(true);
  //display products
  let [displayProducts, setDisplayProducts] = useState<product[]>([]);
  //filter categories
  let [categories, setCategories] = useState<string[]>(categoriesParams);
  //filter brands
  let [brands, setBrands] = useState<string[]>([]);
  async function getData() {
    setLoading(true);
    let result = await getProducts();
    products.current = result;
    setDisplayProducts(result);
    setLoading(false);
    filterAllProducts();
  }
  function filterAllProducts() {
    let results = products.current?.filter(
      (item) =>
        (categories.length === 0 || categories.includes(item.category)) &&
        (brands.length === 0 || brands.includes(item.brand)) &&
        item.price >= 0 &&
        item.price <= 100000
    );
    console.log(results);
    setDisplayProducts(results);
  }
  function handleFilter(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    //check
    const checked = e.target.checked;
    //item: category, brand,stock
    const item = e.target.name;
    let updatedCategories = [...categories];
    let updatedBrands = [...brands];
    if (type === "category") {
      if (checked) {
        updatedCategories.push(item);
      } else {
        updatedCategories = updatedCategories.filter((ele) => ele !== item);
      }
    } else if (type === "brand") {
      if (checked) {
        updatedBrands.push(item);
      } else {
        updatedBrands = updatedBrands.filter((ele) => ele !== item);
      }
    }
    setCategories(updatedCategories);
    setBrands(updatedBrands);

    setSearchParams({ category: updatedCategories, brand: updatedBrands });
  }
  function chooseBrands(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    const brand = e.target.name;

    let updatedBrands = [...brands];

    if (checked) {
      updatedBrands.push(brand);
    } else {
      updatedBrands = updatedBrands.filter((item) => item !== brand);
    }
    setBrands(updatedBrands);
    updatedBrands.forEach((brand) => {
      searchParams.append("brand", brand);
    });
    setBrands(updatedBrands);
    setSearchParams(searchParams);
  }
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
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    filterAllProducts();
  }, [categories, brands]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-5">
          <div className="flex justify-evenly  gap-4">
            <div className=" bg-gray-200 w-[20%]">
              <h1 className="font-semibold text-lg   text-black uppercase">
                Products Categories
              </h1>
              {allCategories.map((item) => {
                return (
                  <div className="my-5">
                    <label
                      className="capitalize flex items-center space-x-1"
                      htmlFor={item}
                    >
                      <input
                        className="appearance-none h-5 w-5 bg-gray-100 border border-solid border-gray-200 cursor-pointer rounded-sm checked:bg-main"
                        type="checkbox"
                        name={item}
                        id={item}
                        onChange={(e) => handleFilter(e, "category")}
                        checked={categoriesParams.includes(item)}
                      />
                      <span className="text-lg">{item}</span>
                    </label>
                  </div>
                );
              })}
              <h1 className="font-semibold text-lg   text-black uppercase">
                Products Brands
              </h1>
              {allBrands.map((item) => {
                return (
                  <div className="my-5">
                    <label
                      className="capitalize flex items-center space-x-1"
                      htmlFor={item}
                    >
                      <input
                        className="appearance-none h-5 w-5 bg-gray-100 border border-solid border-gray-200 cursor-pointer rounded-sm checked:bg-main"
                        type="checkbox"
                        name={item}
                        id={item}
                        onChange={(e) => {
                          handleFilter(e, "brand");
                        }}
                        checked={brandsPrams.includes(item)}
                      />
                      <span className="text-lg">{item}</span>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className=" w-[70%]">
              <div
                style={{
                  backgroundImage: `url(${bgShop})`,
                }}
                className="bg-cover bg-center w-full h-64 flex flex-col justify-center items-center space-y-3 text-2xl"
              >
                <h3>Organic Meals Prepared</h3>
                <h3 className="font-semibold">
                  Delivered to{" "}
                  <span className="text-main font-bold">your Home</span>.
                </h3>
                <p className="text-gray-400 text-base">
                  Fully prepared & delivered nationwide.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg w-full h-14 flex justify-between items-center my-3 text-gray-400 p-2">
                <h3>{displayProducts.length} products</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {displayProducts.map((item) => {
                  return <ProductCard product={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
