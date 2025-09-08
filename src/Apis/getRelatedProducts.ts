import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";

export async function getRelatedProducts(category: string | undefined) {
  try {
    let { data } = await axios.get(`${supabaseUrl}/rest/v1/products`, {
      headers: {
        apikey:supabaseKey ,
        Authorization: `Bearer ${supabaseKey}`,
        Range: "0-9",
      },
      params: {
        select: "*",
        category: `eq.${category}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
