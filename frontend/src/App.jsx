import { useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { addToCart, fetchCart, setQty, removeLine, checkout } from "./api/cart";

export default function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchCart().then(setCart).catch(() => {});
  }, []);

  const cartCount = (cart.items || []).reduce((s, l) => s + (l.qty || 0), 0);

  async function handleAdd(productId) {
    try {
      const next = await addToCart(productId, 1);
      setCart(next);
    } catch {
      alert("Failed to add to cart");
    }
  }

  async function handleSetQty(lineId, qty) {
    try {
      const next = await setQty(lineId, qty);
      setCart(next);
    } catch (e) {
      alert("Could not update quantity");
    }
  }

  async function handleRemove(lineId) {
    try {
      const next = await removeLine(lineId);
      setCart(next);
    } catch {
      alert("Could not remove item");
    }
  }

  async function handleCheckoutSubmit(form) {
    try {
      const r = await checkout(form);
      setReceipt(r);
      setCart({ items: [], total: 0 });
    } catch {
      alert("Checkout failed");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <header className="w-full">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3">
          <h1 className="m-0 text-2xl font-bold text-white">NEXORA</h1>
          <button
            onClick={() => setCartOpen(true)}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-sm font-semibold hover:bg-zinc-850"
          >
            Cart: {cartCount}
          </button>
        </div>
      </header>

      <main className="w-full">
        <div className="mx-auto max-w-[1280px] px-5 pb-8">
          <ProductGrid onAdd={handleAdd} />
        </div>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => { setCartOpen(false); setReceipt(null); }}
        cart={cart}
        onSetQty={handleSetQty}
        onRemove={handleRemove}
        onCheckout={() => { setCheckoutOpen(true); setCartOpen(false); }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => { setCheckoutOpen(false); setReceipt(null); }}
        onSubmit={handleCheckoutSubmit}
        receipt={receipt}
      />
    </div>
  );
}
