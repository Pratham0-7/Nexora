const { Router } = require("express");
const { getProducts } = require("../db/mongo.js");

const r = Router();

// list all products
r.get("/", async (_req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = r;
