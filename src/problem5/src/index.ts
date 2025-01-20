import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import UserRouter from "./routes/user";
import ErrorController from "./controllers/error";
import { swaggerUi, swaggerSpec } from "./swagger";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/user", UserRouter);

app.use("*", ErrorController.get404);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
