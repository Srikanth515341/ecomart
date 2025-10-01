const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Point to: ecomart/server/uploads
const uploadDir = path.join(__dirname, "../../uploads");

// Ensure the folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);   // ✅ absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), productController.addProduct);
router.get("/", productController.getProducts);
router.put("/:id", upload.single("image"), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
