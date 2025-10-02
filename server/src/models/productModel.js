const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    offerPrice: { type: DataTypes.FLOAT },
    image: { type: DataTypes.STRING },
    inStock: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "products", timestamps: true }
);

module.exports = Product;
