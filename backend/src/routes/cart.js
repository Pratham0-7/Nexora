const { Router } = require("express");
const { getCart, addToCart, setQty, removeLine } = require("../db/mongo.js");

const r = Router();

// get cart
r.get("/", async (_req, res) => {
  try {
    const cart = await getCart();
    res.json(cart);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// add to cart: { productId, qty }
r.post("/", async (req, res) => {
  const { productId, qty = 1 } = req.body || {};
  if (!productId) return res.status(400).json({ error: "productId required" });

  try {
    const cart = await addToCart(productId, Number(qty));
    res.json(cart);
  } catch (e) {
    if (e.code === "NOT_FOUND") return res.status(404).json({ error: e.message });
    if (e.code === "BAD_QTY")   return res.status(400).json({ error: e.message });
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// set qty: { qty }
r.post("/:id/qty", async (req, res) => {
  const { qty } = req.body || {};
  if (!Number.isFinite(Number(qty))) return res.status(400).json({ error: "qty must be a number" });

  try {
    const cart = await setQty(req.params.id, Number(qty));
    res.json(cart);
  } catch (e) {
    if (e.code === "NOT_FOUND") return res.status(404).json({ error: e.message });
    if (e.code === "BAD_QTY")   return res.status(400).json({ error: e.message });
    res.status(500).json({ error: "Failed to update qty" });
  }
});

// remove a line by its id
r.delete("/:id", async (req, res) => {
  try {
    const cart = await removeLine(req.params.id);
    res.json(cart);
  } catch (e) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

module.exports = r;
