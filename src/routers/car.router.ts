import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get("/", carController.getAll);

router.get(
  "/:id",
  commonMiddleware.isIdValid,
  carMiddleware.getByIdOrThrow,
  carController.getById,
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.create,
);

router.put(
  "/:id",

  commonMiddleware.isIdValid,
  commonMiddleware.isBodyValid(CarValidator.update),
  carMiddleware.getByIdOrThrow,
  authMiddleware.checkAccessToken,
  carController.updateById,
);

router.delete(
  "/:id",

  commonMiddleware.isIdValid,
  carMiddleware.getByIdOrThrow,
  authMiddleware.checkAccessToken,
  carController.deleteById,
);
export const carRouter = router;
