import React, { useEffect, useState } from "react";
import styles from "../styles/AdminOrders.module.css";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Customer Orders</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.product_id}</td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
                <td>{order.payment_method}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
