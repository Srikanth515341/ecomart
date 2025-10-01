import React, { useEffect, useState } from "react";
import styles from "../styles/ProductList.module.css";
import { getProducts, deleteProduct } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Product List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Offer Price</th>
            <th>In Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.image && (
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className={styles.image}
                    />
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.offerPrice ? `₹${product.offerPrice}` : "-"}</td>
                <td>{product.inStock ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
