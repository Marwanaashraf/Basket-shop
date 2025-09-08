import React, { useContext, useState } from "react";
import { product } from "../../Interfaces/IproductCard";
import { ProductContext } from "../../Context/ProductContext";
import { cartContext } from "../../Context/CartContext";
type Tproduct = {
  product: product;
  addProductToCart: (productId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void
};
export default function ProductCard({ product, addProductToCart, updateQuantity }: Tproduct) {
  let { cartItems } = useContext(cartContext)!;
  const cartItem = cartItems.find(ci => ci.products.id === product.id);
  let productContext = useContext(ProductContext);
  return (
    <>
      <div
        onClick={() => {
          productContext?.setProduct(product);
        }}
        className="relative border border-solid border-gray-200 rounded-lg p-3 cursor-pointer hover:scale-[0.95] transition-all duration-300 flex flex-col justify-between h-full"
        key={product.id}
      >
        <img className="w-full " src={product.images[0]} alt={product.name} />
        <div className="space-y-1 ">
          <span className="text-slate-500 main">{product.category}</span>
          <h3 className="text-lg font-medium">{product.name}</h3>
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
            <span className="text-gray-400 ">({product.rate})</span>
          </div>
          <div className="font-semibold flex flex-wrap space-x-0 md:space-x-1 text-base md:text-lg ">
            <del className="text-gray-400 w-full  md:w-fit ">${product.price}</del>
            <h3 className="text-red-600 w-full md:w-fit ">
              $
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </h3>
          </div>
          <div className=" text-center">
            {cartItem ? (
              // Show + - buttons if product is already in cart
              <div className="flex items-center w-full justify-center">
                <button onClick={(e) => {
                  e.stopPropagation(); 
                  updateQuantity(cartItem.id, cartItem.quantity - 1)}} className="w-8 h-8 border border-main rounded-full text-main">-</button>
                <span className="min-w-[32px] text-center text-sm text-gray-700 ">{cartItem.quantity}</span>
                <button disabled={product.quantity <= cartItem.quantity} onClick={(e) => {
                  e.stopPropagation(); 
                  updateQuantity(cartItem.id, cartItem.quantity + 1)}} 
                  className="w-8 h-8 border border-main rounded-full text-main disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
                  >+</button>
              </div>
            ) : (
              // Show Add to Cart button if product not in cart
              <button disabled={product.inStock === false} onClick={(e) => {
                e.stopPropagation(); 
                addProductToCart(product.id)}} className="btn "><svg
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
              </svg> <span>Add to cart</span> </button>
            )}
          </div>
          <div className="bg-red-600 rounded-full w-14 h-6 flex justify-center items-center text-white absolute top-1 right-1 text-sm">
            <h3>{product.discountPercentage.toFixed(2)}%</h3>
          </div>
        </div>
      </div>
    </>
  );
}
