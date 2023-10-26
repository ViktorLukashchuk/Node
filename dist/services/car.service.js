"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const api_errors_1 = require("../errors/api.errors");
const car_repository_1 = require("../repositories/car.repository");
class CarService {
    async getAll() {
        return await car_repository_1.carRepository.getAll();
    }
    async create(dto, userId) {
        return await car_repository_1.carRepository.createCar(dto, userId);
    }
    async updateById(carId, dto, userId) {
        await this.checkAvailabilityToManage(userId, carId);
        return await car_repository_1.carRepository.updateCar(carId, dto);
    }
    async deleteById(carId, userId) {
        await this.checkAvailabilityToManage(userId, carId);
        await car_repository_1.carRepository.deleteCar(carId);
    }
    async checkAvailabilityToManage(userId, manageCarId) {
        const car = await car_repository_1.carRepository.getOneByParams({
            _userId: userId,
            _id: manageCarId,
        });
        if (!car) {
            throw new api_errors_1.ApiError("U are not allowed for such action", 403);
        }
        return car;
    }
}
exports.carService = new CarService();
