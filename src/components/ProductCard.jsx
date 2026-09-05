import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="rating">★ {product.rating?.toFixed(1) || "4.5"}</div>

        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <span className="discount">{product.discountPercentage?.toFixed(0) || 10}% OFF</span>
        </div>

        <button className="primary-btn full" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}