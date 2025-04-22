import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  DeviceInfo,
  TypeBrand,
} from "./models/models.js";

dotenv.config();

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    console.log("Attempting to authenticate with database...");
    await sequelize.authenticate();
    console.log("Database authentication successful!");
    console.log("Attempting to sync database...");
    await sequelize.sync();
    console.log("Database sync successful!");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error("Error:", e);
  }
};

start();
