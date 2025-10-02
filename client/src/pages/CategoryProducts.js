import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { CartContext } from "../context/CartContext";
import styles from "../styles/CategoryProducts.module.css";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        const filtered = data.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase().trim() === categoryName.toLowerCase().trim()
        );
        setProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [categoryName]);

  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{categoryName} Products</h2>
      <div className={styles.grid}>
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={
                    product.image
                      ? `http://localhost:5000${product.image}`
                      : "https://via.placeholder.com/150" // fallback
                  }
                  alt={product.name}
                />
                <h3>{product.name}</h3>
              </Link>
              <p className={styles.price}>
                ₹{product.offerPrice || product.price}
                {product.offerPrice && (
                  <span className={styles.strike}>₹{product.price}</span>
                )}
              </p>
              <div className={styles.actions}>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button onClick={() => handleBuyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
