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

  public async isEmailUnique(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await userRepository.getOneByParams({ email });
      if (user) {
        throw new ApiError("Email already exist", 409);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
  public isUserExist<T>(field: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const user = await userRepository.getOneByParams({
          [field]: req.body[field],
        });

        if (!user) {
          throw new ApiError("User NOT found", 404);
        }
        req.res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
