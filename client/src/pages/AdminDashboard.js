import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import styles from "../styles/AdminDashboard.module.css";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import AdminOrders from "./AdminOrders";

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>EcoMart Admin</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/add-product">Add Product</Link>
            </li>
            <li>
              <Link to="/admin/products">Product List</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <Routes>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route
            path="/"
            element={<h2>Welcome to the Admin Dashboard</h2>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
