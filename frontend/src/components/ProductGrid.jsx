import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ onAdd = () => {} }) {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e?.message || "Failed to load products"));
  }, []);

  if (error) return <div className="text-red-400">Error: {error}</div>;
  if (!products) return <div>Loading products…</div>;

  return (
    <section className="w-full">
      <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p._id || p.id} product={p} onAdd={() => onAdd(p.id)} />
        ))}
      </div>
    </section>
  );
}
