const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ➕ Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // check if product already in cart
    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📦 Get all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    res.json(cartItems);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) return res.status(404).json({ message: "Item not found" });

    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove Cart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🗑️ Clear cart for a user
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.destroy({ where: { userId } });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
