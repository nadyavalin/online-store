import express from "express";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";

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

import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

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
