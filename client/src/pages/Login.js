import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import styles from "../styles/Auth.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login({ email, password });
      login(data.user, data.token);
      if (data.user.role === "seller") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>User Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <p>
          Create an account? <Link to="/register">Click here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
