import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const submit = e => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <section className="container success">
        <h1>🎉 Order placed!</h1>
        <p>Your demo order has been successfully created.</p>
        <button className="primary-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </section>
    );
  }

  return (
    <section className="container checkout-page">
      <form className="checkout-form" onSubmit={submit}>
        <h1>Checkout</h1>

        <label>Full Name</label>
        <input required />

        <label>Address</label>
        <textarea required rows="4"></textarea>

        <label>City</label>
        <input required />

        <label>PIN Code</label>
        <input required pattern="[0-9]{6}" />

        <button className="primary-btn full">Place Demo Order</button>
      </form>

      <aside className="summary">
        <h2>Your Order</h2>
        {cart.map(item => (
          <div className="summary-line" key={item.id}>
            <span>{item.title} × {item.quantity}</span>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        ))}
        <hr />
        <div className="summary-line total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </aside>
    </section>
  );
}