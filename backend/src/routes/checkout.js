const { Router } = require("express");
const { createOrderFromCart } = require("../db/mongo.js");

const r = Router();

r.post("/", async (_req, res) => {
  try {
    const receipt = await createOrderFromCart();
    res.json(receipt);
  } catch (e) {
    res.status(500).json({ error: "Checkout failed" });
  }
});

module.exports = r;
