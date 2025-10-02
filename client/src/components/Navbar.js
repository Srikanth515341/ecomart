import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/home.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <span>EcoMart</span>
      </div>

      {/* Links */}
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">All Products</Link>
        </li>

        {/* Orders link only for customers */}
        {user && user.role === "customer" && (
          <li>
            <Link to="/orders">My Orders</Link>
          </li>
        )}
      </ul>

      {/* Search Bar */}
      <div className={styles.search}>
        <input type="text" placeholder="Search products" />
        <button>🔍</button>
      </div>

      {/* Cart & Auth */}
      <div className={styles.actions}>
        <Link to="/cart" className={styles.cart}>
          🛒<span className={styles.cartCount}>0</span>
        </Link>

        {user ? (
          <div className={styles.userSection}>
            <span className={styles.userName}>Hi, {user.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
