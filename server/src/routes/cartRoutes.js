const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// ➕ Add item to cart
router.post("/", cartController.addToCart);

// 📦 Get cart by userId
router.get("/:userId", cartController.getCart);

// ❌ Remove item from cart by cartId
router.delete("/:id", cartController.removeFromCart);

// 🗑️ Clear cart by userId
router.delete("/user/:userId", cartController.clearCart);

module.exports = router;
