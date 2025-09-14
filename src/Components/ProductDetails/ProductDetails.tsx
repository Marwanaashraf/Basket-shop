import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import SharePage from "../SharePage/SharePage";
export default function ProductDetails() {
  let navigate = useNavigate();
  let [showShare, setShowShare] = useState<boolean>(false);
  //product details
  let productContext = useContext(ProductContext);
  let url = `${window.location.origin}/product/${productContext?.productDetails?.id}`;
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
  return (
    <div className="product-parent fixed top-0 left-0 right-0 bottom-0  z-[1500] flex justify-center items-center">
      <div
        id="pDetails"
        className="product-details bg-white rounded-lg w-[90%] lg:w-[70%] md:w-[70%] sm:w-[80%] h-[90%] overflow-auto relative"
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
        <ProductDetail showShare={showShare} setShare={setShowShare} />
        {showShare ? <SharePage url={url} setShare={setShowShare} /> : ""}
      </div>
    </div>
  );
}
