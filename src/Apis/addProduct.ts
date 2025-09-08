import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";
import toast from "react-hot-toast";
import { productSend } from "../Interfaces/SendProduct";

export async function addProduct(product: productSend, setLoading: Function) {
  try {
    setLoading(true);
    let { data } = await axios.post(
      `${supabaseUrl}/rest/v1/products`,
      product,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    setLoading(false);
    toast.success("product added successfully");
  } catch (error :any) {
    setLoading(false);
    console.log(error?.response?.data);
    toast.error("Failed to add product please try again");
  }
}
