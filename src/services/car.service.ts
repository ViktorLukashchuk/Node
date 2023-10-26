import { ApiError } from "../errors/api.errors";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async create(dto: ICar, userId: string): Promise<ICar> {
    return await carRepository.createCar(dto, userId);
  }

  public async updateById(
    carId: string,
    dto: Partial<ICar>,
    userId: string,
  ): Promise<ICar> {
    await this.checkAvailabilityToManage(userId, carId);
    return await carRepository.updateCar(carId, dto);
  }

  public async deleteById(carId: string, userId: string): Promise<void> {
    await this.checkAvailabilityToManage(userId, carId);
    await carRepository.deleteCar(carId);
  }

  private async checkAvailabilityToManage(
    userId: string,
    manageCarId: string,
  ): Promise<ICar> {
    const car = await carRepository.getOneByParams({
      _userId: userId,
      _id: manageCarId,
    });
    if (!car) {
      throw new ApiError("U are not allowed for such action", 403);
    }
    return car;
  }
}

export const carService = new CarService();
