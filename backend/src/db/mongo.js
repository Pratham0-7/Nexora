const mongoose = require("mongoose");

let isConnected = false;

async function connect() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in env");

  await mongoose.connect(uri, { dbName: "nexora" });
  isConnected = true;
  console.log("Db connected.");
}

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", ProductSchema);

async function seedProductsIfEmpty(seedData) {
  await connect();

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(seedData);
    console.log(`${seedData.lenght} added to db`);
  } else {
    console.log("Products present already.");
  }
}

const CartLineSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    productId: { type: String, required: true },
    name: String,
    price: Number,
    qty: Number,
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    lines: [CartLineSchema],
  },
  { versionKey: false }
);

const Cart = mongoose.model("Cart", CartSchema);

function calcTotal(lines) {
  return lines.reduce((s, l) => s + l.price * l.qty, 0);
}

function makeLineId() {
  return `line- ${Date.now().toString(36)} - ${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

const USER = "demo-user";

async function getProducts() {
  await connect();
  return Product.find().lean();
}

async function getCart() {
  await connect();
  const cart = await Cart.findOne({ userId: USER }).lean();
  const lines = cart?.lines ?? [];
  return { items: lines, total: calcTotal(lines) };
}

async function addToCart(productId, qty = 1) {
  await connect();
  if (!Number.isFinite(qty) || qty <= 0) {
    const err = new Error("Invalid qty");
    err.code = "BAD_QTY";
    throw err;
  }

  const p = await Product.findOne({ id: productId }).lean();
  if (!p) {
    const err = new Error("Product not found");
    err.code = "NOT_FOUND";
    throw err;
  }

  let cart = await Cart.findOne({ userId: USER });
  if (!cart) {
    const lines = [
      { id: makeLineId(), productId, name: p.name, price: p.price, qty },
    ];
    await Cart.create({ userId: USER, lines });
    return { items: lines, total: calcTotal(lines) };
  }

  const existing = cart.lines.find((l) => l.productId === productId);
  if (existing) existing.qty += qty;
  else
    cart.lines.push({
      id: makeLineId(),
      productId,
      name: p.name,
      price: p.price,
      qty,
    });

  await cart.save();
  const items = cart.toObject().lines;
  return { items, total: calcTotal(items) };
}

async function setQty(lineId, qty) {
  await connect();
  if (!Number.isFinite(qty) || qty < 1) {
    const err = new Error("Invalid qty");
    err.code = "BAD_QTY";
    throw err;
  }

  const cart = await Cart.findOne({ userId: USER });
  if (!cart) {
    const err = new Error("Cart not found");
    err.code = "NOT_FOUND";
    throw err;
  }

  const line = cart.lines.find((l) => l.id === lineId);
  if (!line) {
    const err = new Error("Cart line not found");
    err.code = "NOT_FOUND";
    throw err;
  }

  line.qty = qty;
  await cart.save();
  const items = cart.toObject().lines;
  return { items, total: calcTotal(items) };
}

async function removeLine(lineId) {
  await connect();
  const cart = await Cart.findOne({ userId: USER });
  if (!cart) return { items: [], total: 0 };

  cart.lines = cart.lines.filter((l) => l.id !== lineId);
  await cart.save();
  const items = cart.toObject().lines;
  return { items, total: calcTotal(items) };
}

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    lines: [CartLineSchema],
    total: Number,
    receiptId: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Order = mongoose.model("Order", OrderSchema);

function calcTotal(lines) {
  return lines.reduce((s, l) => s + l.price * l.qty, 0);
}

async function createOrderFromCart() {
  await connect();

  const cartDoc = await Cart.findOne({ userId: USER }).lean();
  const lines = cartDoc?.lines ?? [];
  const total = calcTotal(lines);
  const receiptId = "rcpt-" + Date.now();

  const order = await Order.create({
    userId: USER,
    lines,
    total,
    receiptId,
  });

  await Cart.updateOne({ userId: USER }, { $set: { lines: [] } });

  return { receiptId, total, timestamp: order.createdAt.toISOString() };
}

module.exports = {
  connect,
  seedProductsIfEmpty,
  getProducts,
  getCart,
  addToCart,
  setQty,
  removeLine,

  createOrderFromCart,
};
