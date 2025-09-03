import React, { useContext, useState } from "react";
import { product } from "../../Interfaces/IproductCard";
import { ProductContext } from "../../Context/ProductContext";
type Tproduct = {
  product: product;
};
export default function ProductCard({ product }: Tproduct) {
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
        <img className="w-full" src={product.images[0]} alt={product.name} />
        <div className="space-y-1 ">
          <span className="text-slate-500">{product.category}</span>
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
          <div className="font-semibold flex space-x-1 text-lg">
            <del className="text-gray-400">${product.price}</del>
            <h3 className="text-red-600">
              $
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </h3>
          </div>
          <div className=" text-center">
            <button className="btn">Add to cart</button>
          </div>
          <div className="bg-red-600 rounded-full w-14 h-6 flex justify-center items-center text-white absolute top-1 right-1 text-sm">
            <h3>{product.discountPercentage.toFixed(2)}%</h3>
          </div>
        </div>
      </div>
    </>
  );
}
