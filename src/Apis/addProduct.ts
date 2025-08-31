import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";
import toast from "react-hot-toast";
import { product } from "../Interfaces/IproductCard";

export async function addProduct(product: product, setLoading: Function) {
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
  } catch (error) {
    setLoading(false);
  }
}
