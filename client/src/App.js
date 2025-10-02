import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";  // ✅ Import CartProvider

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import AdminOrders from "./pages/AdminOrders";

// Customer Pages
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  return (
    <CartProvider>
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

          {/* Customer Routes */}
          <Route path="/products" element={<Categories />} /> {/* ✅ Added */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
