// Using localStorage for now instead of DB

// Get cart
const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Save cart
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Clear cart
const clearCart = () => {
  localStorage.removeItem("cart");
};

const cartService = { getCart, saveCart, clearCart };
export default cartService;
