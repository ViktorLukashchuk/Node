import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }

  public async updateById(id: string, userBody: IUser) {
    const user = await userRepository.updateById(id, userBody);
    return user;
  }

  public async deleteById(id: string) {
    return userRepository.delete(id);
  }
}

export const userService = new UserService();
