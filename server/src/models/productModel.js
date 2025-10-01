const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");  // ✅ destructure sequelize

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  offerPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Product;
