const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Define User model
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "customer", // default role
    },
  },
  {
    tableName: "users",
    timestamps: true, // ✅ Sequelize expects createdAt & updatedAt
  }
);

// Create User
const createUser = async (name, email, password, role) => {
  return await User.create({ name, email, password, role });
};

// Find User by Email
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  User,
  createUser,
  findUserByEmail,
};
