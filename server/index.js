import express from "express";
import cors from "cors";
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

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
// app.get("/", (request, response) => {
//   response.status(200).json({ message: "WORKING!!!" });
// });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error("Error:", e);
  }
};

start();
