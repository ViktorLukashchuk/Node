"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const Car_model_1 = require("../models/Car.model");
class CarRepository {
    async getAll() {
        return await Car_model_1.Car.find();
    }
    async getOneByParams(params) {
        return await Car_model_1.Car.findOne(params);
    }
    async findById(id) {
        return await Car_model_1.Car.findById(id);
    }
    async createCar(dto, userId) {
        return await Car_model_1.Car.create({ ...dto, _userId: userId });
    }
    async updateCar(carId, dto) {
        return await Car_model_1.Car.findByIdAndUpdate(carId, dto, {
            returnDocument: "after",
        });
    }
    async deleteCar(carId) {
        await Car_model_1.Car.deleteOne({ _id: carId });
    }
}
exports.carRepository = new CarRepository();
