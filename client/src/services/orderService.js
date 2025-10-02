import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// Place new order
const placeOrder = async (orderData) => {
  const res = await axios.post(API_URL, orderData);
  return res.data;
};

// Get orders for a customer
const getMyOrders = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`); // ✅ match backend route
  return res.data;
};


const orderService = { placeOrder, getMyOrders };
export default orderService;
