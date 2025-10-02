import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.offerPrice || item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.offerPrice || item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.summary}>
            <h3>Total: ₹{totalPrice}</h3>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
