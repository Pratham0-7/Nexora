import { api } from "./client";

export async function fetchProducts() {
  const res = await api.get("/products");
  return res.data;
}
