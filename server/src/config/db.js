const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Postgres user
  process.env.DB_PASSWORD, // Postgres password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    await sequelize.sync(); // ensures tables exist
    console.log("✅ Tables synchronized");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
