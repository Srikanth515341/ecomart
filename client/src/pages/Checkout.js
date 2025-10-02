import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import orderService from "../services/orderService";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Checkout.module.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user?.name || "",
    mobile: "",
    address: "",
  });

  // Either cart items or single product
  const products =
    location.state?.cart ||
    (location.state?.product ? [location.state.product] : []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("❌ Please login before placing an order");
      navigate("/login");
      return;
    }

    try {
      for (let product of products) {
        await orderService.placeOrder({
          userId: user.id, // use logged-in user's id
          productId: product.id,
          quantity: product.quantity || 1,
          address: form.address,
          paymentMethod: "Cash on Delivery", // default
        });
      }
      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order failed:", err);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <p className={styles.cod}>
          Payment Method: <strong>Cash on Delivery</strong>
        </p>
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default Checkout;
