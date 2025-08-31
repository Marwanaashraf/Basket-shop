import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";

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
    console.log(error);
  }
}
