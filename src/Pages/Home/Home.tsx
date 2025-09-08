import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { product } from "../../Interfaces/IproductCard";
import { getProducts } from "../../Apis/getProducts";
import Loading from "../../Components/Loading/Loading";
import sunglass from "../../assets/Images/categories/sunglass.webp";
import beauty from "../../assets/Images/categories/beuty.webp";
import groceries from "../../assets/Images/categories/groceries.webp";
import laptops from "../../assets/Images/categories/laptob.webp";
import perfumes from "../../assets/Images/categories/perfuem.webp";
import kitchenAccessories from "../../assets/Images/categories/kitchen.webp";
import homeDecoration from "../../assets/Images/categories/home.webp";
import mobileAccessories from "../../assets/Images/categories/warch.webp";
import skinCare from "../../assets/Images/categories/skincare.webp";
import bar from "../../assets/Images/Home/download.png";
import ProductCard from "../../Components/ProductCard/ProductCard";
import slide1 from "../../assets/Images/Home/slide1.png";
import slide2 from "../../assets/Images/Home/slide2.png";
import slide3 from "../../assets/Images/Home/slide3.png";
import grid1 from "../../assets/Images/Home/eggs.png";
import grid2 from "../../assets/Images/Home/coffe.png";
import grid3 from "../../assets/Images/Home/toast.png";
import grid4 from "../../assets/Images/Home/drinks.png";
import grid5 from "../../assets/Images/Home/pergale.png";
import grid6 from "../../assets/Images/Home/icecream.png";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import toast, { Toaster } from "react-hot-toast";
import SwiperCaursol from "../../Components/SwiperCaursol/SwiperCaursol";
import NavButton from "../../Components/NavButton/NavButton";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
export default function Home() {
  let { addToCart, updateQuantity } = useContext(cartContext)!;

  let productContext = useContext(ProductContext);
  let [products, setProducts] = useState<product[]>([]);
  let [isLoading, setLoading] = useState<boolean>(true);
  let navigate = useNavigate();
  let sliders: string[] = [slide1, slide2, slide3];
  let bigOffer = products
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 1);
  type Tcategory = {
    name: string;
    imgPath: string;
  };
  let categories: Tcategory[] = [
    { name: "beauty", imgPath: beauty },
    { name: "sunglasses", imgPath: sunglass },
    { name: "home-decoration", imgPath: homeDecoration },
    { name: "skin-care", imgPath: skinCare },
    { name: "mobile-accessories", imgPath: mobileAccessories },
    { name: "perfumes", imgPath: perfumes },
    { name: "kitchen-accessories", imgPath: kitchenAccessories },
    { name: "laptops", imgPath: laptops },
  ];
  async function getData() {
    setLoading(true);
    let allProducts = await getProducts().catch((error: any) => {
      setLoading(true);
      toast.error(error?.message);
    });
    if (allProducts) {
      setProducts(allProducts);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Toaster position="top-center" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="relative">
            <Swiper
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={true}
              modules={[Navigation, Autoplay, Pagination]}
            >
              {sliders.map((item) => {
                return (
                  <SwiperSlide>
                    <div
                      key={item}
                      style={{ backgroundImage: `url(${item})` }}
                      className="w-full h-[500px] text-black flex items-center bg-cover"
                    >
                      <div className="space-y-4 ms-32">
                        <div className="flex items-center space-x-1 ">
                          <span className="uppercase font-semibold">
                            Exclusive Offer
                          </span>
                          <div className="rounded-full bg-gradient-to-r from-[#00B85333] to-transparent text-green-700 w-24 h-9 flex justify-center items-center">
                            <span className="font-semibold">-20% OFF</span>
                          </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold ">
                          Specialist in the <br /> grocery store
                        </h1>
                        <p>Only this week. Don’t miss...</p>
                        <p>
                          from{" "}
                          <span className="text-red-600 font-bold text-3xl">
                            $7.99
                          </span>
                        </p>
                        <button className="bg-main w-32 h-10 text-white rounded-full">
                          Shop Now{" "}
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <NavButton
              className={"custom-prev absolute top-1/2 left-3 "}
              icon={<i className="fa-solid fa-chevron-left"></i>}
            />
            <NavButton
              className={"custom-next absolute top-1/2 right-3 "}
              icon={<i className="fa-solid fa-chevron-right"></i>}
            />
          </div>

          <section className="contain my-20">
            {/* categories */}
            <section className="categories grid grid-cols-1 lg:grid-cols-5  gap-0">
              <div className="border border-solid border-gray-300 rounded-lg  h-full flex flex-col justify-center items-center lg:col-span-1">
                <img className="w-32" src={groceries} alt="groceries" />
                <h3 className="font-bold text-xl">Groceries</h3>
                <p className="text-gray-400">11 Items</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:col-span-4">
                {categories.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="border border-solid border-gray-300 rounded-lg flex flex-col justify-center items-center p-3"
                    >
                      <img
                        className="w-28"
                        src={item.imgPath}
                        alt={item.name}
                      />
                      <h3 className="font-bold text-xl">{item.name}</h3>
                      <p className="text-gray-400">
                        {
                          products.filter((ele) => ele.category == item.name)
                            .length
                        }{" "}
                        Items
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Big offer */}
            <section className="deals grid grid-cols-1 lg:grid-cols-10 gap-4 my-20 items-center">
              <div className=" lg:col-span-3 hover:scale-[0.96] transition-all duration-300 ">
                <div className="border border-solid border-red-600 rounded-lg h-[75%] p-3">
                  <div className="text-center">
                    <h3 className="text-blue-600 font-semibold text-2xl">
                      Deals of the{" "}
                      <span className="text-blue-800 font-bold">week!</span>{" "}
                    </h3>
                    <div className="flex space-x-1 justify-center items-center my-2">
                      <div className="bg-rose-600 flex justify-center items-center text-white rounded-lg w-11 h-11">
                        70
                      </div>
                      <h3 className="text-xl">:</h3>
                      <div className="bg-rose-600 flex justify-center items-center text-white rounded-lg w-11 h-11">
                        14
                      </div>
                      <h3 className="text-xl">:</h3>
                      <div className="bg-rose-600 flex justify-center items-center text-white rounded-lg w-11 h-11">
                        41
                      </div>
                      <h3 className="text-xl">:</h3>
                      <div className="bg-rose-600 flex justify-center items-center text-white rounded-lg w-11 h-11">
                        11
                      </div>
                    </div>
                    <p className="text-base text-gray-400">
                      Remains until the end of the offer
                    </p>
                  </div>
                  {bigOffer.map((product) => {
                    return (
                      <div
                        onClick={() => {
                          productContext?.setProduct(product);
                        }}
                        key={product.id}
                        className=" relative cursor-pointer "
                      >
                        <img src={product.images[0]} alt={product.name} />
                        <div>
                          <div className="font-semibold flex space-x-1 text-lg">
                            <del className="text-gray-400">
                              ${product.price}
                            </del>
                            <h3 className="text-red-600">
                              $
                              {(
                                product.price -
                                (product.price * product.discountPercentage) /
                                  100
                              ).toFixed(2)}
                            </h3>
                          </div>
                          <h3 className="text-lg font-medium">
                            {product.name}
                          </h3>
                          <h3
                            className={
                              product.inStock
                                ? "text-base uppercase text-main font-semibold"
                                : "text-base uppercase text-red-600 font-semibold"
                            }
                          >
                            {product.inStock ? "In Stock" : "Out Of Stock"}
                          </h3>
                          <div className="flex space-x-1 items text-xs">
                            <i
                              className={
                                Math.ceil(product.rate) >= 1
                                  ? "fa-solid fa-star text-yellow-300 "
                                  : "fa-regular fa-star text-yellow-300 "
                              }
                            ></i>
                            <i
                              className={
                                Math.ceil(product.rate) >= 2
                                  ? "fa-solid fa-star text-yellow-300 "
                                  : "fa-regular fa-star text-yellow-300 "
                              }
                            ></i>
                            <i
                              className={
                                Math.ceil(product.rate) >= 3
                                  ? "fa-solid fa-star text-yellow-300 "
                                  : "fa-regular fa-star text-yellow-300 "
                              }
                            ></i>
                            <i
                              className={
                                Math.ceil(product.rate) >= 4
                                  ? "fa-solid fa-star text-yellow-300 "
                                  : "fa-regular fa-star text-yellow-300 "
                              }
                            ></i>
                            <i
                              className={
                                Math.ceil(product.rate) >= 5
                                  ? "fa-solid fa-star text-yellow-300 "
                                  : "fa-regular fa-star text-yellow-300 "
                              }
                            ></i>
                            <span className="text-gray-400 ">
                              ({product.rate})
                            </span>
                          </div>
                          <div className="flex flex-col space-y-4 my-5">
                            <h3 className="text-gray-400">
                              Available:{" "}
                              <span className="font-semibold text-blue-800">
                                {product.quantity}
                              </span>
                            </h3>
                            <img src={bar} alt="bar" />
                          </div>
                        </div>
                        <div className="absolute top-6 left-16 bg-red-600 w-14 h-14 rounded-full text-white flex justify-center items-center">
                          <h3 className="text-xl">
                            {product.discountPercentage.toFixed(0)}%
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:col-span-7">
                {products
                  .sort((a, b) => b.discountPercentage - a.discountPercentage)
                  .slice(1, 7)
                  .map((item) => {
                    return (
                      <div key={item.id}>
                        <ProductCard
                          product={item}
                          addProductToCart={addToCart}
                          updateQuantity={updateQuantity}
                        />
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* shop */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 my-20">
              <div
                style={{ backgroundImage: `url(${slide1})` }}
                className="h-60 rounded-lg bg-cover bg-center space-y-3 p-3 flex flex-col justify-center"
              >
                <h4 className="uppercase text-red-500 text-lg">
                  Weekend Discount 40%
                </h4>
                <h3 className="font-bold text-3xl">Cookie and Ice Cream</h3>
                <p className="text-lg">Bacola Weekend Discount</p>
                <button
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className="w-32 h-12 bg-blue-800 text-white rounded-full"
                >
                  Shop Now
                </button>
              </div>

              <div
                style={{ backgroundImage: `url(${slide3})` }}
                className="h-60 rounded-lg bg-cover bg-center space-y-3 p-3 flex flex-col justify-center"
              >
                <h4 className="uppercase text-red-500 text-lg">
                  Weekend Discount 40%
                </h4>
                <h3 className="font-bold text-3xl">Cookie and Ice Cream</h3>
                <p className="text-lg">Bacola Weekend Discount</p>
                <button
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className="w-32 h-12 bg-rose-600 text-white rounded-full"
                >
                  Shop Now
                </button>
              </div>
            </section>

            {/* Best Sellers */}
            <section className="my-20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="uppercase font-semibold text-2xl">
                    Best Sellers
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-base">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                <div
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className="rounded-full w-28 h-9 border-2 border-solid border-gray-300 flex justify-center items-center cursor-pointer"
                >
                  <p className="text-gray-400">
                    View All <i className="fa-solid fa-arrow-right-long "></i>
                  </p>
                </div>
              </div>
              <div className="my-7 w-[90%] mx-auto">
                <SwiperCaursol
                  products={products
                    .sort((a, b) => a.price - b.price)
                    .slice(0, 10)}
                />
              </div>
            </section>

            {/* Super discount for your first purchase. */}
            <section className="my-20">
              <div className="bg-amber-100 w-full h-14 rounded-lg flex justify-center items-center">
                <h3
                  className="text-sm sm:text-lg md:text-2xl font-semibold uppercase
                "
                >
                  Super discount for your{" "}
                  <span className="font-bold">first purchase.</span>{" "}
                </h3>
              </div>

              <div className="my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {products
                  .sort((a, b) => b.discountPercentage - a.discountPercentage)
                  .filter((ele) => ele.inStock === true)
                  .slice(0, 10)
                  .map((item) => {
                    return (
                      <div key={item.id}>
                        <ProductCard
                          product={item}
                          addProductToCart={addToCart}
                          updateQuantity={updateQuantity}
                        />
                      </div>
                    );
                  })}
              </div>
            </section>

            {/* last */}
            <section className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                style={{ backgroundImage: `url(${grid1})` }}
                className="h-60 rounded-lg bg-cover bg-center space-y-3 p-3 flex flex-col justify-center"
              >
                <h4 className="uppercase text-main font-medium text-lg">
                  Weekend Discount 40%
                </h4>
                <h3 className="font-bold text-3xl">Natural Eggs</h3>
                <p className="text-lg">Eat one every day</p>
                <button
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className="w-32 h-12 bg-zinc-400 text-white rounded-full"
                >
                  Shop Now
                </button>
              </div>

              <div
                style={{ backgroundImage: `url(${grid2})` }}
                className="h-60 rounded-lg bg-cover bg-center space-y-3 p-3 flex flex-col justify-center"
              >
                <h4 className="uppercase text-main font-medium text-lg">
                  Weekend Discount 40%
                </h4>
                <h3 className="font-bold text-3xl">Taste the Best</h3>
                <p className="text-lg">Shine the morning</p>
                <button
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className="w-32 h-12 bg-zinc-400 text-white rounded-full"
                >
                  Shop Now
                </button>
              </div>

              <div
                style={{ backgroundImage: `url(${grid3})` }}
                className="h-60 rounded-lg bg-cover bg-center space-y-3 p-3 flex flex-col justify-center"
              >
                <h4 className="uppercase text-main font-medium text-lg">
                  Weekend Discount 40%
                </h4>
                <h3 className="font-bold text-3xl">Ditch the Junk</h3>
                <p className="text-lg">Breakfast made better</p>
                <button
                  onClick={() => {
                    navigate("/shop");
                  }}
                  className="w-32 h-12 bg-zinc-400 text-white rounded-full"
                >
                  Shop Now
                </button>
              </div>

              <div className="space-y-1">
                <img className="rounded-lg w-full" src={grid4} alt="" />
                <p className="text-gray-400 font-semibold uppercase">Grocery</p>
                <h3 className="text-xl font-semibold text-black">
                  But I must explain to you how all this mistaken idea
                </h3>
                <p className="text-gray-400 font-semibold">Jan 13 2025</p>
              </div>

              <div className="space-y-1">
                <img className="rounded-lg w-full" src={grid5} alt="" />
                <p className="text-gray-400 font-semibold uppercase">Grocery</p>
                <h3 className="text-xl font-semibold text-black">
                  The Problem With Typefaces on the Web
                </h3>
                <p className="text-gray-400 font-semibold">Jan 13 2025</p>
              </div>

              <div className="space-y-1">
                <img className="rounded-lg w-full" src={grid6} alt="" />
                <p className="text-gray-400 font-semibold uppercase">Grocery</p>
                <h3 className="text-xl font-semibold text-black">
                  English Breakfast Tea With Tasty Donut Desserts
                </h3>
                <p className="text-gray-400 font-semibold">Jan 13 2025</p>
              </div>
            </section>
          </section>

          {productContext?.productDetails ? <ProductDetails /> : ""}
        </>
      )}
    </>
  );
}
