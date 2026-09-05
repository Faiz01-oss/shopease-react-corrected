import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found.");
        return res.json();
      })
      .then(setProduct)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="status">Loading product...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <section className="container">
      <Link to="/" className="back-link">← Back to products</Link>

      <div className="details">
        <div className="details-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="details-info">
          <span className="category">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="rating">★ {product.rating.toFixed(1)} / 5</div>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p>{product.description}</p>

          <div className="stock">
            {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
          </div>

          <button
            className="primary-btn"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}