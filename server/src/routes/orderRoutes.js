const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// 🛒 Place an order
router.post("/", orderController.placeOrder);

// 👤 Get orders of a user
router.get("/:userId", orderController.getUserOrders);  // ✅ keep simple userId

// 👨‍💼 Get all orders (Admin)
router.get("/", orderController.getAllOrders);

module.exports = router;
