import { NextFunction, Request, Response } from "express";

import { carService } from "../services/car.service";
import { ICar } from "../types/car.type";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll();
      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const car = req.res.locals;
      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const createdCar = await carService.create(req.body);
      res.status(201).json(createdCar);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ICar>> {
    try {
      const updatedCar = await carService.updateById(req.params.id, req.body);
      return res.status(201).json(updatedCar);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await carService.deleteById(req.params.id);
      res.status(204).json("Car was deleted");
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
