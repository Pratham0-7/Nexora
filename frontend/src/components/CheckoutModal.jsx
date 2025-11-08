export default function CheckoutModal({ open, onClose, onSubmit, receipt }) {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    onSubmit({ name, email });
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      <div className="fixed inset-0 z-50 grid place-items-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">
              {receipt ? "Receipt" : "Checkout"}
            </h3>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">✕</button>
          </div>

          {!receipt ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Name</label>
                <input
                  name="name"
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-100 font-semibold hover:bg-zinc-750"
              >
                Place Order
              </button>
            </form>
          ) : (
            <div className="space-y-2 text-zinc-200">
              <div><span className="text-zinc-400">Receipt ID:</span> {receipt.receiptId}</div>
              <div><span className="text-zinc-400">Total:</span> ₹{receipt.total}</div>
              <div><span className="text-zinc-400">Time:</span> {new Date(receipt.timestamp).toLocaleString()}</div>
              <button
                className="mt-3 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-100 font-semibold hover:bg-zinc-750"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
