import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.errors";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators/user.validator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log("Server has been started");
});

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.json(users);
  },
);

app.get(
  "/users/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new ApiError("User NOT found", 404);
      }
      return res.json(user);
    } catch (e) {
      next(e);
      // return res.status(400).json(e.message);
    }
  },
);

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = UserValidator.create.validate(req.body);
    if (error) {
      throw new ApiError(error.message, 400);
    }
    const createdUser = await User.create(value);
    res.status(201).json(createdUser);
  } catch (e) {
    next(e);
    //    return res.status(400).json(e.message);
  }
});

app.put(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const user = await User.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.status(201).json(user);
    } catch (e) {
      next(e);
      //    return res.status(400).json(e.message);
    }
  },
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { deletedCount } = await User.deleteOne({ _id: id });
      if (!deletedCount) {
        throw new ApiError("User not found", 404);
      }
      res.sendStatus(204);
    } catch (e) {
      next(e);
      //    return res.status(400).json(e.message);
    }
  },
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  res.status(status).json(error.message);
});
