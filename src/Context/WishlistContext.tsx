import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { api, supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { User } from "../Context/UserContext";
import { WishlistItem } from "../Interfaces/WishlistItem";
import { IWishlistContext } from "../Interfaces/WishlistContext";
// Create context with default undefined
export const wishlistContext = createContext<IWishlistContext | undefined>(undefined);

// Define props type
interface WishlistProviderProps {
    children: ReactNode;
}

export default function WishlistContextProvider({ children }: WishlistProviderProps) {
    // const [wishlistCount, setWishlistCount] = useState<number>(0);
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const { userId, auth } = useContext(User)!;

    useEffect(() => {
        const initUserWishlist = async () => {
            if (!userId || !auth) {
                setWishlistItems([]);
                return;
            }
            await getWishlist();
        };

        initUserWishlist();
    }, [auth, userId]);

    async function addToWishlist(productId: string) {
        if (!userId) {
            toast.error("Please login first");
            return;
        }
        try {
            const { data } = await api.post<WishlistItem[]>(
                "/wishlist",
                { product_id: productId, user_id: userId },
                {
                    headers: {
                        Authorization: `Bearer ${auth}`,
                        "Content-Type": "application/json",
                    },
                    params: {
                        select: "id,products(*)",
                    },
                }
            );
            if (data && data.length > 0) {
                setWishlistItems((prev) => [...prev, data[0]]);
            }
            toast.success("Product added to whishlist");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    async function getWishlist() {
        if (!userId) {
            toast.error("Please login first");
            return [];
        }
        try {
            const { data } = await api.get("/wishlist", {
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
                params: {
                    user_id: `eq.${userId}`,
                    select: "id,products(*)",
                },
            });
            setWishlistItems(data ?? []);
        } catch (error) {
            console.error("Error checking wishlist:", error);
        }
    }
    async function removeFromWishlist(wishlistId: string,) {
        try {
            await api.delete("/wishlist", {
                headers: {
                    Authorization: `Bearer ${auth}`,
                    "Content-Type": "application/json",
                },
                params: { id: `eq.${wishlistId}` },
            });
            setWishlistItems((prev) => prev.filter((cartItem) => cartItem.id !== wishlistId));
            toast.success("Product removed from whishlist");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <wishlistContext.Provider
            value={{
                addToWishlist,
                removeFromWishlist,
                wishlistItems
            }}
        >
            {children}
        </wishlistContext.Provider>
    );
}
