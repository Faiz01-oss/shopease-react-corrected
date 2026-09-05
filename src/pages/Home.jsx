import React from "react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const API = "https://dummyjson.com/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}?limit=100`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load products.");
        return res.json();
      })
      .then(data => setProducts(data.products))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map(p => p.category))],
    [products]
  );

  const filtered = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">WELCOME TO SHOPEASE</p>
          <h1>Shop smart. Live better.</h1>
          <p>Explore products from a real public API with search, categories, cart and product details.</p>
          <a href="#products" className="primary-btn">Explore Products</a>
        </div>
      </section>

      <section className="container" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR STORE</p>
            <h2>Products</h2>
          </div>

          <input
            className="search"
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="categories">
          {categories.map(item => (
            <button
              key={item}
              className={category === item ? "category-btn active" : "category-btn"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {loading && <p className="status">Loading products...</p>}
        {error && <p className="status error">{error}</p>}

        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="status">No products found.</p>
        )}
      </section>
    </>
  );
}