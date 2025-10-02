const Product = require("../models/productModel");
const path = require("path");

// ➕ Add new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      offerPrice,
      image: imagePath,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📦 Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Get Products Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, offerPrice, inStock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imagePath = product.image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    await product.update({
      name,
      description,
      category,
      price,
      offerPrice,
      inStock,
      image: imagePath,
    });

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("❌ Update Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🗑️ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
