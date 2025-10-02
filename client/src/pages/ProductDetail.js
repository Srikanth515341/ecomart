import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { CartContext } from "../context/CartContext";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProducts();
        const found = data.find((p) => String(p.id) === id);
        setProduct(found);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  const handleBuyNow = () => {
    navigate(`/checkout`, { state: { product } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
        />
      </div>
      <div className={styles.details}>
        <h2>{product.name}</h2>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>
          ₹{product.offerPrice || product.price}
          {product.offerPrice && (
            <span className={styles.strike}>₹{product.price}</span>
          )}
        </p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.actions}>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
