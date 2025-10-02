import React, { useState } from "react";
import styles from "../styles/AddProduct.module.css";
import productService from "../services/productService"; // ✅ use default import

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Vegetables",
    price: "",
    offerPrice: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("category", formData.category);
      productData.append("price", formData.price);
      productData.append("offerPrice", formData.offerPrice);
      if (formData.image) {
        productData.append("image", formData.image);
      }

      // ✅ call through productService
      await productService.addProduct(productData);
      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "Vegetables",
        price: "",
        offerPrice: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add product.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Product</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Drinks">Drinks</option>
          <option value="Instant">Instant</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Grains">Grains</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="offerPrice"
          placeholder="Offer Price"
          value={formData.offerPrice}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
