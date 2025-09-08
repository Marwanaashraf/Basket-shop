import React from "react";
import { product } from "./IproductCard";

export interface IproductProvider {
  productDetails: product | null;
  setProduct: React.Dispatch<React.SetStateAction<product | null>>;
}
