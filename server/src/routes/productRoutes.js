const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Absolute path to "server/uploads"
const uploadDir = path.join(__dirname, "../../uploads");

// Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // unique filename →  timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ---------------- Routes ---------------- //

// ➕ Add Product
router.post("/", upload.single("image"), productController.addProduct);

// 📦 Get All Products
router.get("/", productController.getProducts);

// ✏️ Update Product
router.put("/:id", upload.single("image"), productController.updateProduct);

// 🗑️ Delete Product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
