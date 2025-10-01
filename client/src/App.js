import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
