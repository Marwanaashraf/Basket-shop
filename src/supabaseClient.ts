import { createClient } from '@supabase/supabase-js'
import axios from "axios";
export const supabaseUrl = "https://xnbirwmlnifixzjrwrdk.supabase.co"
export const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYmlyd21sbmlmaXh6anJ3cmRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDE4NDcsImV4cCI6MjA3MTk3Nzg0N30.84_ckog0jcvGaGuM9ez8Couxhd-8oq3fISNphg-S8Xo"
export const supabase = createClient(supabaseUrl, supabaseKey)

export const api = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },});