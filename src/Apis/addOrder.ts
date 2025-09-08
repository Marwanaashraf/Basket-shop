import { product } from './../Interfaces/IproductCard';
import toast from "react-hot-toast";
import { IOrder } from "../Interfaces/Order";
import { api } from "../supabaseClient";

type Order = {
  id: string;
};
export async function addOrder(
  order: IOrder,
  setLoading: Function,
  token: string | null,
  userId: string | null,
  clearCart: Function
) {
  try {
    setLoading(true);
    const { data } = await api.post<Order[]>(
      "/orders",
      { ...order.orderData, user_id: userId },
      {
        headers: {

          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: { select: "id" },
      }
    );
    let orderId = data[0].id;
    // cartItems it to orderItems
    const orderItems = order.cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.products.id,
      quantity: item.quantity,
      price: (
        item.products.price *
        (1 - item?.products?.discountPercentage / 100)
      ).toFixed(2),
    }
    ));

    
    for (const item of order.cartItems) {
      const { data: products } = await api.get<product[]>("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: `eq.${item.products.id}`, select: "quantity" },
      });
      // console.log(products);
      const newQuantity = products?.[0].quantity - item.quantity;
      console.log(newQuantity);
      
      if (newQuantity < 0) {
        toast.error(`${item.products.name || "Product"} is out of stock`);
        continue; // skip this item
      }
      // console.log(item.products.id);
      
      const { data, status } = await api.patch(
        "/products",
        { quantity: newQuantity, inStock: newQuantity > 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: { id: `eq.${item.products.id}` },
        }
      );
      
    }

    await api.post("/orderItems", orderItems, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    clearCart();
    toast.success("Order placed successfully");
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
}
