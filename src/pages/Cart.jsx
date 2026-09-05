import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <section className="container empty">
        <h1>Your cart is empty</h1>
        <p>Add some products before checking out.</p>
        <Link to="/" className="primary-btn">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="section-heading">
        <h1>Shopping Cart</h1>
        <Link to="/">Continue shopping</Link>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="cart-item-main">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)} each</p>

                <div className="quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="summary-line"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>Free</strong></div>
          <hr />
          <div className="summary-line total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="primary-btn full" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </aside>
      </div>
    </section>
  );
}