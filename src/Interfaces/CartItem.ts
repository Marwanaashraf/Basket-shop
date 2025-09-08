// interface productCartItem {
//     id: string;
//     name: string;
//     price: number;
//     discountPercentage: number;
//     images: string[];

import { product } from "./IproductCard";

// }
export interface CartItem {
    id: string;
    cart_id: string;
    product_id: string;
    quantity: number;
    products: product;
};