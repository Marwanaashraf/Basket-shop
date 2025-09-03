import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { getRelatedProducts } from "../../Apis/getRelatedProducts";
import { product } from "../../Interfaces/IproductCard";
import Slider from "react-slick";

export default function ProductDetails() {
  //product details
  let productContext = useContext(ProductContext);
  //related products
  let [relatedProducts, setRelatedProducts] = useState<product[]>();
  //image slide
  let imgSlide = useRef<HTMLImageElement | null>(null);
  //check image src
  let [img, setImg] = useState<string | null>(null);
  //read more details
  let [readMore, setReadMore] = useState(true);
  //settings
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //slider
  function handleChangeImage(
    e: React.MouseEvent<HTMLImageElement>,
    image: string
  ) {
    //set Image src
    imgSlide?.current?.setAttribute("src", image);
    //set check Image
    setImg(image);
  }
  //handle product details
  function handleDetails() {
    let pDetails = document.querySelector(".p-details");
    //less
    if (readMore) {
      pDetails?.classList.remove("line-clamp-1");
      setReadMore(false);
    }
    //more
    else {
      pDetails?.classList.add("line-clamp-1");
      setReadMore(true);
    }
  }
  //get related products by category
  async function getRelated() {
    if (productContext?.productDetails) {
      let products = await getRelatedProducts(
        productContext?.productDetails?.category
      );
      setRelatedProducts(products);
    }
  }
  //get product details from related products
  function handleRelatedProduct(product: product) {
    if (productContext?.productDetails?.id === product?.id) {
      return;
    } else {
      productContext?.setProduct(product);
    }
  }
  useEffect(() => {
    let productParent = document.querySelector(".product-parent");
    //if click in any thing close product

    productParent?.addEventListener("click", (e) => {
      let product = document.getElementById("pDetails");
      if (!product?.contains(e.target as Node)) {
        productContext?.setProduct(null);
      }
    });
    //if click esc close product
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        productContext?.setProduct(null);
      }
    });
  }, []);
  useEffect(() => {
    //refresh set check src
    if (imgSlide?.current?.getAttribute("src")) {
      setImg(imgSlide.current?.getAttribute("src"));
    }
  }, []);
  useEffect(() => {
    getRelated();
  }, []);
  return (
    <div className="product-parent fixed top-0 left-0 right-0 bottom-0  z-[1500] flex justify-center items-center">
      <div
        id="pDetails"
        className="product-details bg-white rounded-lg w-[90%] lg:w-[60%] md:w-[70%] sm:w-[80%]  h-[90%] overflow-auto relative"
      >
        {/* close */}
        <div
          onClick={() => {
            productContext?.setProduct(null);
          }}
          className="absolute top-3 right-4 cursor-pointer hover:text-black transition-all duration-300"
        >
          <i className="fa-solid fa-x "></i>
        </div>

        {/* details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8  p-3">
          {/* slider Image */}
          <div className="flex space-x-3">
            {/* images */}
            <div className="flex flex-col space-y-2">
              {productContext?.productDetails?.images.map((image) => {
                return (
                  <img
                  key={image}
                    onClick={(e) => {
                      handleChangeImage(e, image);
                    }}
                    className={
                      image === img
                        ? "p-images w-32 border-2 border-solid border-main rounded-md cursor-pointer"
                        : "p-images w-32 border border-solid  border-gray-300 rounded-md cursor-pointer"
                    }
                    src={image}
                    alt={productContext?.productDetails?.name}
                  />
                );
              })}
            </div>

            {/* slider */}
            <div>
              <img
                ref={imgSlide}
                className="img-slider border border-solid border-gray-300 rounded-md"
                src={productContext?.productDetails?.images[0]}
                alt={productContext?.productDetails?.name}
              />
            </div>
          </div>

          {/* product Details */}
          <div className="flex flex-col space-y-3">
            {/* title */}
            <h3 className="text-lg font-medium">
              {productContext?.productDetails?.name}
            </h3>

            {/* price */}
            <div className="font-semibold flex space-x-1 text-lg">
              <del className="text-gray-400">
                ${productContext?.productDetails?.price}
              </del>
              <h3 className="text-red-600">
                $
                {productContext?.productDetails
                  ? (
                      productContext?.productDetails?.price -
                      (productContext?.productDetails?.price *
                        productContext?.productDetails?.discountPercentage) /
                        100
                    ).toFixed(2)
                  : productContext?.productDetails?.price}
              </h3>
            </div>

            {/* cart */}
            <div className="bg-gray-200  h-10 rounded-md flex justify-center items-center ">
              {/* counter cart */}
              <div className="flex justify-evenly items-center w-1/2">
                <i className="fa-solid fa-minus cursor-pointer"></i>
                <p className="text-xl">0</p>
                <i className="fa-solid fa-plus cursor-pointer"></i>
              </div>
            </div>

            {/* add to cart */}
            <button
              disabled={productContext?.productDetails?.inStock === false}
              className="bg-main cursor-pointer  h-10 rounded-md flex justify-center items-center text-white space-x-3 disabled:bg-green-300 disabled:cursor-default"
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7998 19.0172L16.5401 4.8319C16.5131 4.51697 16.2477 4.27853 15.9373 4.27853H13.3458C13.3099 1.91207 11.3753 0 8.99978 0C6.62435 0 4.68979 1.91207 4.6538 4.27853H2.06239C1.74746 4.27853 1.48652 4.51697 1.45953 4.8319L0.199812 19.0172C0.199812 19.0352 0.195312 19.0532 0.195312 19.0712C0.195312 20.6863 1.67548 22 3.49756 22H14.5021C16.3242 22 17.8043 20.6863 17.8043 19.0712C17.8043 19.0532 17.8043 19.0352 17.7998 19.0172ZM8.99978 1.21472C10.7049 1.21472 12.0951 2.58241 12.1311 4.27853H5.86852C5.90452 2.58241 7.2947 1.21472 8.99978 1.21472ZM14.5021 20.7853H3.49756C2.35482 20.7853 1.42803 20.0294 1.41004 19.0982L2.61576 5.49775H4.6493V7.34233C4.6493 7.67975 4.91924 7.94969 5.25666 7.94969C5.59409 7.94969 5.86403 7.67975 5.86403 7.34233V5.49775H12.1311V7.34233C12.1311 7.67975 12.4011 7.94969 12.7385 7.94969C13.0759 7.94969 13.3458 7.67975 13.3458 7.34233V5.49775H15.3794L16.5896 19.0982C16.5716 20.0294 15.6403 20.7853 14.5021 20.7853Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.1"
                />
              </svg>
              <h3 className="font-semibold"> Add To Cart</h3>
            </button>
            {/* wishlist , share */}
            <div className="grid grid-cols-2 gap-3 text-black">
              {/* wishlist */}
              <div className=" border border-gray-300 h-12 rounded-lg flex justify-center items-center space-x-2 font-semibold text-lg cursor-pointer">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8447 0.84375H15.7939C13.7779 0.84375 11.9955 1.91016 10.9697 3.48438C9.94394 1.91016 8.16152 0.84375 6.14551 0.84375H6.09473C2.95137 0.874219 0.407227 3.42852 0.407227 6.58203C0.407227 8.46094 1.22988 11.127 2.83457 13.3207C5.8916 17.5 10.9697 21.1562 10.9697 21.1562C10.9697 21.1562 16.0479 17.5 19.1049 13.3207C20.7096 11.127 21.5322 8.46094 21.5322 6.58203C21.5322 3.42852 18.9881 0.874219 15.8447 0.84375ZM17.9572 12.4828C15.7939 15.4434 12.4982 18.1754 10.9697 19.3687C9.44121 18.1754 6.14551 15.4383 3.98223 12.4777C2.49434 10.4465 1.8291 8.05469 1.8291 6.58203C1.8291 5.43437 2.27598 4.35781 3.07832 3.54531C3.88574 2.73281 4.95723 2.28086 6.10488 2.2707H6.15059C6.87676 2.2707 7.59785 2.45859 8.2377 2.81914C8.85723 3.16953 9.39551 3.66719 9.78145 4.26641C10.0455 4.66758 10.4924 4.91133 10.9748 4.91133C11.4572 4.91133 11.9041 4.66758 12.1682 4.26641C12.5592 3.66719 13.0924 3.16953 13.7119 2.81914C14.3518 2.45859 15.0729 2.2707 15.799 2.2707H15.8447C16.9873 2.28086 18.0639 2.73281 18.8713 3.54531C19.6787 4.35781 20.1205 5.43945 20.1205 6.58203C20.1104 8.05469 19.4451 10.4465 17.9572 12.4828Z"
                    fill="black"
                  />
                </svg>
                <h3>Wishlist</h3>
              </div>

              {/* share */}
              <div className=" border border-gray-300 h-12 rounded-lg flex justify-center items-center space-x-2 font-semibold text-lg cursor-pointer">
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_49_1633)">
                    <path
                      d="M23.2002 13L14.2627 4.46875V9.34375C5.70961 9.34375 3.7002 15.4766 3.7002 21.5312C6.16867 18.3706 8.35176 16.6562 14.2627 16.6562V21.5312L23.2002 13Z"
                      stroke="black"
                      strokeWidth="1.625"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_49_1633">
                      <rect
                        width="26"
                        height="26"
                        fill="white"
                        transform="translate(0.450195)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <h3>Share</h3>
              </div>
            </div>

            {/* tags */}
            <div className="flex items-center flex-wrap space-x-2 space-y-2">
              <h3 className="flex space-x-1 items-center text-lg font-semibold">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.625 1.5H12.8677C11.9662 1.5 11.1188 1.851 10.4812 2.48849L2.13974 10.83C1.72725 11.2425 1.5 11.7908 1.5 12.3765C1.5 12.9593 1.72725 13.5075 2.13974 13.92L7.08 18.8603C7.49249 19.2728 8.04075 19.5 8.62649 19.5C9.20924 19.5 9.7575 19.2728 10.17 18.8603L18.5115 10.5188C19.149 9.88125 19.5 9.03374 19.5 8.13226V3.37499C19.5 2.3415 18.6585 1.5 17.625 1.5ZM18.75 8.13226C18.75 8.83352 18.477 9.49277 17.982 9.98777L9.63976 18.33C9.1005 18.8693 8.15476 18.873 7.611 18.33L2.67 13.389C2.39926 13.119 2.24999 12.759 2.24999 12.3735C2.24999 11.991 2.39923 11.631 2.67 11.3603L11.0115 3.01875C11.508 2.52301 12.1665 2.24999 12.8677 2.24999H17.625C18.2452 2.24999 18.75 2.75473 18.75 3.37499V8.13226Z"
                    fill="#999999"
                    stroke="#999999"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M15.375 3.75C14.3415 3.75 13.5 4.5915 13.5 5.62499C13.5 6.65848 14.3415 7.49998 15.375 7.49998C16.4085 7.49998 17.25 6.65851 17.25 5.62499C17.25 4.5915 16.4085 3.75 15.375 3.75ZM15.375 6.74999C14.7547 6.74999 14.25 6.24525 14.25 5.62499C14.25 5.00473 14.7547 4.49999 15.375 4.49999C15.9953 4.49999 16.5 5.00473 16.5 5.62499C16.5 6.24525 15.9952 6.74999 15.375 6.74999Z"
                    fill="#999999"
                    stroke="#999999"
                    strokeWidth="0.5"
                  />
                </svg>
                <span>Tags: </span>
              </h3>
              {productContext?.productDetails?.tags.map((ele) => {
                return (
                  <div key={ele} className="h-7 border border-gray-300 rounded-md flex justify-center items-center font-medium text-sm p-2">
                    {ele}
                  </div>
                );
              })}
            </div>
            {/* details */}
            <div>
              <h3 className="text-lg font-semibold">Product Details:</h3>
              <p className="p-details text-slate-500 line-clamp-1">
                {productContext?.productDetails?.details}
              </p>
              {readMore ? (
                <span
                  onClick={handleDetails}
                  className="text-main font-semibold cursor-pointer"
                >
                  Read More
                </span>
              ) : (
                <span
                  onClick={handleDetails}
                  className="text-main font-semibold cursor-pointer"
                >
                  Less More
                </span>
              )}
            </div>
          </div>
        </div>
        {/* related products */}

        {relatedProducts ? (
          <div className="contain">
            <h3 className="font-bold text-lg">Related products</h3>
            <div className="w-[92%] mx-auto">
              <Slider className="p-4 my-5 " {...settings}>
                {relatedProducts?.map((item) => {
                  return (
                    <div className="px-1 h-full ">
                      <div
                        key={item.id}
                        className="border border-gray-200 relative px-2 rounded-lg p-2  h-full "
                      >
                        <div className="relative">
                          <img
                            className="w-full"
                            src={item.images[0]}
                            alt={item.name}
                          />
                          <div
                            onClick={() => {
                              handleRelatedProduct(item);
                            }}
                            className="absolute bottom-0 right-0 bg-main w-8 h-8 rounded-full flex justify-center items-center text-white cursor-pointer"
                          >
                            {productContext?.productDetails?.id === item.id ? (
                              <i className="fa-regular fa-eye"></i>
                            ) : (
                              <i className="fa-solid fa-plus"></i>
                            )}
                          </div>
                        </div>

                        <div className="my-2">
                          <div className="font-semibold flex space-x-1 text-xs md:text-sm">
                            <del className="text-gray-400">${item.price.toFixed(0)}</del>
                            <h3 className="text-black">
                              $
                              {(
                                item.price -
                                (item.price * item.discountPercentage) / 100
                              ).toFixed(0)}
                            </h3>
                          </div>
                          <h3 className="text-base font-medium">
                            {item.name.split(" ").slice(0, 2).join(" ")}
                          </h3>
                        </div>

                        {item.inStock ? (
                          <div className="bg-main rounded-full w-14 h-6 flex justify-center items-center text-white absolute top-1 left-1 text-xs">
                            <h3 className="uppercase font-medium">on Sale</h3>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
