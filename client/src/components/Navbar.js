import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/home.png"; // using home.png as temporary logo (replace later if needed)

const Navbar = () => {
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
          <Link to="/products">All Product</Link>
        </li>
          
      </ul>

      {/* Search Bar */}
      <div className={styles.search}>
        <input type="text" placeholder="Search products" />
        <button>🔍</button>
      </div>

      {/* Cart & Login */}
      <div className={styles.actions}>
        <Link to="/cart" className={styles.cart}>
          🛒<span className={styles.cartCount}>0</span>
        </Link>
        <Link to="/login" className={styles.loginBtn}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
