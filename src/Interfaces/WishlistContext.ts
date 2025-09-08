import { WishlistItem } from "./WishlistItem";

export interface IWishlistContext {
    wishlistItems: WishlistItem[];
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (wishlistId: string) => void;
}