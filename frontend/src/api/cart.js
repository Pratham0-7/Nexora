import { api } from "./client";

export async function fetchCart() {
  const { data } = await api.get("/cart");
  return data;
}

export async function addToCart(productId, qty = 1) {
  const { data } = await api.post("/cart", { productId, qty });
  return data;
}

export async function setQty(lineId, qty) {
  const { data } = await api.post(`/cart/${lineId}/qty`, { qty });
  return data; 
}

export async function removeLine(lineId) {
  const { data } = await api.delete(`/cart/${lineId}`);
  return data; 
}

export async function checkout(payload = {}) {
  const { data } = await api.post("/checkout", payload);
  return data;
}
