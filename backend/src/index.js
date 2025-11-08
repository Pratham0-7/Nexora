require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");

const { connect, seedProductsIfEmpty } = require("./db/mongo");
const seed = require("../seed/products.json");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

(async () => {
  try {
    await connect();
    await seedProductsIfEmpty(seed);
    app.listen(PORT, () => {
      console.log(`API on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
})();
