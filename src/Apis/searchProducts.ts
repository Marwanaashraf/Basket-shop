import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";
import toast from "react-hot-toast";

export async function searchProducts(query: string) {
  try {
    let { data } = await axios.get(`${supabaseUrl}/rest/v1/products`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      params: {
        select: "*",
        name: `ilike.%${query}%`,
      },
    });
    return data;
  } catch (error) {
    console.error(error)
    toast.error("Error while searching products");
  }
}
