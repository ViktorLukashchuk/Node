"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carMiddleware = void 0;
const api_errors_1 = require("../errors/api.errors");
const car_repository_1 = require("../repositories/car.repository");
class CarMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { id } = req.params;
            const car = await car_repository_1.carRepository.findById(id);
            if (!car) {
                throw new api_errors_1.ApiError("Car NOT found", 404);
            }
            req.res.locals = car;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.carMiddleware = new CarMiddleware();
