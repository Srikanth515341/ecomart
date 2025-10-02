import React, { useEffect, useState, useContext } from "react";
import orderService from "../services/orderService";
import { AuthContext } from "../context/AuthContext";  // ✅ Get logged-in user
import styles from "../styles/Orders.module.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);  // ✅ Get current user

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return; // no user logged in
        const data = await orderService.getMyOrders(user.id); // ✅ use user.id
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  {order.Product
                    ? order.Product.name
                    : `Product #${order.productId}`}
                </td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
