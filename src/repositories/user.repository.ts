import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return User.find();
  }
  public async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }

  public create(userBody: IUser) {
    return User.create(userBody);
  }

  public updateById(id: string, userBody: IUser) {
    return User.findByIdAndUpdate(id, userBody, {
      returnDocument: "after",
    });
  }
  public delete(id: string) {
    return User.deleteOne({ _id: id });
  }
}

export const userRepository = new UserRepository();
