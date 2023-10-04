import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.errors";
import { carRouter } from "./routers/car.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json(error.message);
});

app.listen(5000, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log("Server has been started");
});
