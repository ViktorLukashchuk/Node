import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.create,
);

router.put(
  "/:id",
  commonMiddleware.isIdValid,
  commonMiddleware.isBodyValid(UserValidator.update),
  userMiddleware.getByIdOrThrow,
  userController.updateById,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.deleteById,
);
export const userRouter = router;
