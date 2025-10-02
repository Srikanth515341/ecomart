const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    address: { type: DataTypes.TEXT, allowNull: false },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Cash on Delivery",
    },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "orders", timestamps: true }
);

module.exports = Order;
