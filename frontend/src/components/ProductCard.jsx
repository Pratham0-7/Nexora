export default function ProductCard({ product, onAdd }) {
  const imgUrl =
    product.image ||
    `https://source.unsplash.com/640x360/?${encodeURIComponent(product.name)}`;

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-sm transition hover:shadow-md">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={imgUrl}
          alt={product.name}
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(
              product.id || product._id
            )}/640/360`;
          }}
        />
      </div>

      <div className="mt-3 flex-1">
        <h3 className="text-zinc-100 font-semibold truncate">{product.name}</h3>
        <p className="text-zinc-400 text-sm">₹{product.price}</p>
      </div>

      <button
        onClick={onAdd}
        className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-750 active:scale-[.99] transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
