"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const car_service_1 = require("../services/car.service");
class CarController {
    async getAll(req, res, next) {
        try {
            const cars = await car_service_1.carService.getAll();
            return res.json(cars);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const car = req.res.locals;
            return res.json(car);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const createdCar = await car_service_1.carService.create(req.body);
            res.status(201).json(createdCar);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const updatedCar = await car_service_1.carService.updateById(req.params.id, req.body);
            return res.status(201).json(updatedCar);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            await car_service_1.carService.deleteById(req.params.id);
            res.status(204).json("Car was deleted");
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carController = new CarController();
