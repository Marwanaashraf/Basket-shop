import axios from "axios";
import { supabaseKey, supabaseUrl } from "../supabaseClient";
import toast from "react-hot-toast";

export async function getProducts() {
  try {
    let { data } = await axios.get(`${supabaseUrl}/rest/v1/products`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      params: {
        select: "*",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
