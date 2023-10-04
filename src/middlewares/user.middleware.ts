import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.errors";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      if (!user) {
        throw new ApiError("User NOT found", 404);
      }
      req.res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();