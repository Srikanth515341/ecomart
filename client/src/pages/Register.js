import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import styles from "../styles/Auth.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({ name, email, password, role });
      alert("Registration successful, please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>User Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Create Account</button>
        <p>
          Already have an account? <Link to="/login">Click here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
