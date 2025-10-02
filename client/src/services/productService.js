import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Add Product
const addProduct = async (formData) => {
  try {
    const res = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Add Product Error:", error);
    throw error;
  }
};

// Get All Products
const getProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Get Products Error:", error);
    throw error;
  }
};

// Get Single Product by ID
const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    throw error;
  }
};

// Update Product
const updateProduct = async (id, formData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Update Product Error:", error);
    throw error;
  }
};

// Delete Product
const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete Product Error:", error);
    throw error;
  }
};

// ✅ Default export all functions as a single object
const productService = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productService;
