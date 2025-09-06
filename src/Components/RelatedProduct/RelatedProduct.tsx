import React from "react";
import { product } from "../../Interfaces/IproductCard";
type TproductRelated = {
  product: product;
  //compare id displayed product and related products
  compareId: string |undefined;
  handleRelatedProduct:Function
};
export default function RelatedProduct({ product ,compareId ,handleRelatedProduct }: TproductRelated) {
  return (
    <div
      key={product.id}
      className="border border-gray-200 relative px-2 rounded-lg p-2  h-full "
    >
      <div className="relative">
        <img className="w-full" src={product.images[0]} alt={product.name} />
        <div
          onClick={() => {
            handleRelatedProduct(product);
          }}
          className="absolute bottom-0 right-0 bg-main w-8 h-8 rounded-full flex justify-center items-center text-white cursor-pointer"
        >
          {compareId === product.id ? (
            <i className="fa-regular fa-eye"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </div>
      </div>

      <div className="my-2">
        <div className="font-semibold flex space-x-1 text-xs md:text-sm">
          <del className="text-gray-400">${product.price.toFixed(0)}</del>
          <h3 className="text-black">
            $
            {(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(0)}
          </h3>
        </div>
        <h3 className="text-base font-medium">
          {product.name.split(" ").slice(0, 2).join(" ")}
        </h3>
      </div>

      {product.inStock ? (
        <div className="bg-main rounded-full w-14 h-6 flex justify-center items-center text-white absolute top-1 left-1 text-xs">
          <h3 className="uppercase font-medium">on Sale</h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
