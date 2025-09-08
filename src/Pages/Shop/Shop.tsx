import React, { useContext, useEffect, useRef, useState } from "react";
import "./Shop.css";
import { getProducts } from "../../Apis/getProducts";
import { useSearchParams } from "react-router-dom";
import bgShop from "../../assets/Images/shop/bgShop-CugBvGr8.png";
import { product } from "../../Interfaces/IproductCard";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FilterProducts from "../../Components/FilterProducts/FilterProducts";
import { Toaster } from "react-hot-toast";
import ProductSlider from "../../Components/ProductsSlider/ProductSlider";
import { ProductContext } from "../../Context/ProductContext";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
export default function Shop() {
  let productContext = useContext(ProductContext);
  let { addToCart, updateQuantity } = useContext(cartContext)!;

  //search params
  const [searchParams, setSearchParams] = useSearchParams();
  let categoriesParams = searchParams.getAll("category");
  let brandsPrams = searchParams.getAll("brand");
  let availabilityPrams = searchParams.getAll("availability");
  let priceFromParams = searchParams.get("priceFrom");
  let priceToParams = searchParams.get("priceTo");
  //filter products
  let products = useRef<product[]>([]);
  let [isLoading, setLoading] = useState<boolean>(true);
  //display products
  let [displayProducts, setDisplayProducts] = useState<product[]>([]);
  //filter categories
  let [categories, setCategories] = useState<string[]>(categoriesParams);
  //filter brands
  let [brands, setBrands] = useState<string[]>(brandsPrams);
  //price
  let [priceFrom, setPriceFrom] = useState<string | null>(priceFromParams);
  let [priceTo, setPriceTo] = useState<string | null>(priceToParams);
  //availability
  let [availability, setAvailability] = useState<string[]>(availabilityPrams);
  let [toggleSlider, setToggle] = useState<boolean>(false);
  //handle filter
  function handleFilter(e: React.ChangeEvent<HTMLInputElement>, type: string) {
    //price value
    const val = e.target.value;
    //check
    const checked = e.target.checked;
    //item: category, brand,stock
    const item = e.target.name;
    //updated
    let updatedCategories = [...categories];
    let updatedBrands = [...brands];
    let updatedAvailability = [...availability];
    let updatedPriceFrom: string | null = priceFrom;
    let updatedPriceTo: string | null = priceTo;
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
    } else if (type == "priceFrom") {
      updatedPriceFrom = String(val);
      setPriceFrom(updatedPriceFrom);
    } else if (type == "priceTo") {
      updatedPriceTo = String(val);
      setPriceTo(updatedPriceTo);
    } else if (type == "availability") {
      if (checked) {
        updatedAvailability.push(item);
      } else {
        updatedAvailability = updatedAvailability.filter((ele) => ele !== item);
      }
    }
    setCategories(updatedCategories);
    setBrands(updatedBrands);
    setAvailability(updatedAvailability);
    setSearchParams({
      category: updatedCategories,
      brand: updatedBrands,
      availability: updatedAvailability,
      priceFrom: updatedPriceFrom != null ? updatedPriceFrom : "",
      priceTo: updatedPriceTo != null ? updatedPriceTo : "",
    });
    filterAllProducts();
  }
  function filterAllProducts() {
    let results = products.current?.filter(
      (item) =>
        (categories.length === 0 || categories.includes(item.category)) &&
        (brands.length === 0 || brands.includes(item.brand)) &&
        (availability.length === 0 ||
          availability.includes(item.stockstatus)) &&
        item.price >= (Number(priceFrom) || 0) &&
        item.price <= (Number(priceTo) || 100000)
    );

    setDisplayProducts(results);
  }
  async function getData() {
    setLoading(true);
    let result = await getProducts();
    products.current = result;
    setDisplayProducts(result);
    setLoading(false);
    filterAllProducts();
  }

  //get products api
  useEffect(() => {
    getData();
  }, []);
  //if categories or brands change filter products
  useEffect(() => {
    filterAllProducts();
  }, [categories, brands, priceFrom, priceTo, availability]);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Shop</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Toaster position="top-center" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="py-20">
            <div className="flex justify-evenly  gap-4">
              <div className="w-[25%] hidden lg:block">
                <FilterProducts
                  products={displayProducts}
                  handleFilter={handleFilter}
                />
              </div>
              <div className="w-[90%] lg:w-[65%]">
                <div className="bg-gray-100 rounded-lg w-full h-14 flex lg:hidden justify-between items-center my-3 text-gray-400 p-2">
                  <i
                    onClick={() => {
                      setToggle(true);
                    }}
                    className="fa-solid fa-bars text-xl text-black cursor-pointer"
                  ></i>
                </div>
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
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                  {displayProducts.map((item) => {
                    return <div className=" h-full" key={item.id}>
                      <ProductCard
                                                product={item}
                                                addProductToCart={addToCart}
                                                updateQuantity={updateQuantity}
                                              />
                    </div>;
                  })}
                </div>
              </div>
            </div>
          </div>
          {toggleSlider ? (
            <ProductSlider
              products={displayProducts}
              handleFilter={handleFilter}
              setToggle={setToggle}
            />
          ) : (
            ""
          )}
          {productContext?.productDetails ? <ProductDetails /> : ""}
        </>
      )}
    </>
  );
}
