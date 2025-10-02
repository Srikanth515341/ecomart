const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// 🛒 Place an order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, address } = req.body;

    const order = await Order.create({
      userId,
      productId,
      quantity,
      address,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("❌ Place Order Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👤 Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "offerPrice", "image"],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error("❌ Get User Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👨‍💼 Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "offerPrice", "image"],
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error("❌ Get All Orders Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
