import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";

export async function getProductDetails(id: string | undefined) {
  try {
    let { data } = await axios.get(`${supabaseUrl}/rest/v1/products`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      params: {
        select: "*",
        id: `eq.${id}`,
      },
    });
    return data[0] 
  } catch (error) {
    console.error(error);
  }
}
