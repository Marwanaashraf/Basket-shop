import { Dispatch, SetStateAction } from "react";
import { CartItem } from "./CartItem";

export interface ICartContext {
    cartCount: number;
    setCartCount: Dispatch<SetStateAction<number>>;
    addToCart: (productId: string, quantity?: number) => void;
    removeFromCart: (itemId: string) => void;
    cartItems: CartItem[];
    totalPrice: number;
    updateQuantity: (itemId: string, newQuantity: number) => void;
    clearCart: () => void;
    adjustCartItems: (cartItems: CartItem[]) => void;
}