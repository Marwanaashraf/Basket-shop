import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { api, supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import axios from "axios";
import { CartItem } from "../Interfaces/CartItem";
import { ICartContext } from "../Interfaces/CartContext";
import { User } from "../Context/UserContext";
// Create context with default undefined
export const cartContext = createContext<ICartContext | undefined>(undefined);

// Define props type
interface CartProviderProps {
  children: ReactNode;
}

type Cart = {
  id: string;
};

export default function CartContextProvider({ children }: CartProviderProps) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartId, setCartId] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userContext = useContext(User)!;
  const initRef = useRef(false);
  // ensure cart exists
  useEffect(() => {
    const initUserCart = async () => {
      if (!userContext.userId || !userContext.auth) {
        setCartId("");
        setCartItems([]);
        setCartCount(0);
        return;
      }
      try {
        // Fetch existing cart
        const { data: carts } = await api.get<Cart[]>("/carts", {
          headers: {

            Authorization: `Bearer ${userContext.auth}`,
          },
          params: { user_id: `eq.${userContext.userId}`, select: "id" },
        });

        let cartId: string;

        if (carts && carts.length > 0) {
          cartId = carts[0]?.id;
        } else {
          // Create new cart only if none exists
          const { data: newCart } = await api.post<Cart[]>(
            "/carts",
            { user_id: userContext.userId },
            {
              headers: {

                Authorization: `Bearer ${userContext.auth}`,
                "Content-Type": "application/json",
              },
              params: {
                select: "id",
              },
            }
          );

          cartId = newCart[0]?.id;
        }

        setCartId(cartId);

        // Fetch cart items safely
        await fetchCartItems(cartId);
      } catch (error: any) {
        console.error("Failed");
      }
    };

    initUserCart();
  }, [userContext.auth, userContext.userId]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartItems));
    setCartCount(cartItems.length);
  }, [cartItems]);

  function calculateTotalPrice(items: CartItem[]) {
    return items.reduce((sum, item) => {
      const priceAfterDiscount =
        item.products.price *
        (1 - (item.products.discountPercentage ?? 0) / 100);

      return sum + item.quantity * priceAfterDiscount;
    }, 0);
  }
  async function fetchCartItems(cartIdParam?: string | null) {
    try {
      // Fetch CartItems
      const { data: cartItems } = await api.get<CartItem[]>("/cartItems", {
        headers: {

          Authorization: `Bearer ${userContext.auth}`,
        },
        params: {
          select:
            "id,quantity, products(*)",
          cart_id: `eq.${cartIdParam ?? cartId}`,
        },
      });
      // Adjusting cartItmes
      adjustCartItems(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  function adjustCartItems(cartItemsParam?: CartItem[]) {
    // Adjusting cartItmes
    const fixedItems = (cartItemsParam ?? cartItems).map((item: CartItem) => {
      if (item.quantity > item.products.quantity) {
        toast.error(`${item.products.name} stock reduced. Adjusting cart.`);
        updateQuantity(item.id, item.products.quantity)
        return { ...item, quantity: item.products.quantity };
      }
      return item;
    });

    setCartItems(fixedItems || []);
  }
  async function addToCart(productId: string, quantity?: number) {
    if (!userContext.auth) {
      toast.error("Please login first");
      return;
    }
    try {
      const { data } = await api.post<CartItem[]>(
        "/rpc/add_to_cart",
        { p_cart_id: cartId, p_product_id: productId, p_quantity: quantity ?? 1 },
        {
          headers: {
            Authorization: `Bearer ${userContext.auth}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data);
      const newItem = data[0];
      setCartItems((prev) => {
        // replace if exists, otherwise append
        const exists = prev.find((item) => item.id === newItem.id);
        return exists
          ? prev.map((i) => (i.id === newItem.id ? newItem : i))
          : [...prev, newItem];
      });
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Faild");
    }
  }
  async function removeFromCart(itemId: string) {
    try {
      await api.delete("/cartItems", {
        headers: {

          Authorization: `Bearer ${userContext.auth}`,
        },
        params: { id: `eq.${itemId}` },
      });
      toast.success("Product removed successfully");
      // Update CartItems
      setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== itemId));
    } catch (error) {
      toast.error("Faild");
    }
  }
  async function clearCart() {
    try {
      const { data, status } = await api.delete("/cartItems", {
        headers: {

          Authorization: `Bearer ${userContext.auth}`,
        },
        params: {
          cart_id: `eq.${cartId}`, // delete this user's cart items
        },
      });

      if (status === 200 || status === 204) {
        // Update state only if deletion succeeded
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  }
  async function updateQuantity(itemId: string, newQuantity: number) {
    if (newQuantity === 0) {
      await removeFromCart(itemId);
    } else {
      try {
        // Update in Supabase (cartItems table)
        const { data } = await api.patch(
          `/cartItems`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${userContext.auth}`,
            },
            params: { id: `eq.${itemId}` }, // update where id = itemId
          }
        );
        toast.success("Quantity updated");
        // Update CartItems
        setCartItems((prev) =>
          prev.map((ci) =>
            ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
          )
        );
      } catch (err) {
        toast.error("Failed to update quantity");
      }
    }
  }
  return (
    <cartContext.Provider
      value={{
        cartCount,
        setCartCount,
        addToCart,
        cartItems,
        totalPrice,
        removeFromCart,
        updateQuantity,
        clearCart,
        adjustCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
