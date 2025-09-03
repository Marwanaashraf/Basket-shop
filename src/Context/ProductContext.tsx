import { createContext, ReactNode, useState } from "react";
import { product } from "../Interfaces/IproductCard";
import { IproductProvider } from "../Interfaces/IproductProvider";

export let ProductContext = createContext<IproductProvider | undefined>(undefined);
type props = {
  children: ReactNode;
};
export function ProductProvider({ children }: props) {
  const [productDetails, setProduct] = useState<product | null>(null);
  return (
    <ProductContext.Provider value={{ productDetails, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
