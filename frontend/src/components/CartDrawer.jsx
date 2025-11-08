export default function CartDrawer({
  open,
  onClose,
  cart,
  onSetQty,
  onRemove,
  onCheckout,
}) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <aside className="fixed right-0 top-0 z-50 h-full w-[360px] max-w-[90vw] bg-zinc-950 border-l border-zinc-800 shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">Your Cart</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-9rem)]">
          {(!cart.items || cart.items.length === 0) && (
            <div className="text-zinc-400">Cart is empty.</div>
          )}

          {cart.items?.map((l) => (
            <div
              key={l.id}
              className="rounded-xl border border-zinc-800 p-3 flex items-center gap-3"
            >
              <div className="flex-1">
                <div className="font-medium text-zinc-100">{l.name}</div>
                <div className="text-sm text-zinc-400">₹{l.price}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 rounded-md border border-zinc-700 text-zinc-200"
                  onClick={() => onSetQty(l.id, Math.max(1, (l.qty ?? 1) - 1))}
                >
                  −
                </button>
                <input
                  className="w-12 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-center text-zinc-100"
                  value={l.qty ?? 1}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isNaN(n) && n >= 1) onSetQty(l.id, n);
                  }}
                />
                <button
                  className="px-2 py-1 rounded-md border border-zinc-700 text-zinc-200"
                  onClick={() => onSetQty(l.id, (l.qty ?? 1) + 1)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onRemove(l.id)}
                className="ml-2 rounded-md border border-red-800 text-red-300 px-2 py-1 hover:bg-red-900/20"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-zinc-200">
            <span>Total</span>
            <span className="text-lg font-semibold">₹{cart.total ?? 0}</span>
          </div>
          <button
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-100 font-semibold hover:bg-zinc-750 disabled:opacity-50"
            onClick={onCheckout}
            disabled={!cart.items || cart.items.length === 0}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
