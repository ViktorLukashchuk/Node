import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return User.find().lean();
  }
  public async findById(id: string): Promise<IUser> {
    return User.findById(id).lean();
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return User.findOne(params).lean();
  }

  public register(dto: IUserCredentials): Promise<IUser> {
    return User.create({ ...dto });
  }
  public async setStatus(userId: string, status: any): Promise<void> {
    await User.updateOne(
      { _id: userId },
      {
        $set: { status },
      },
    ).lean();
  }
  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public updateById(id: string, userBody: IUser) {
    return User.findByIdAndUpdate(id, userBody, {
      returnDocument: "after",
    }).lean();
  }
  public delete(id: string) {
    return User.deleteOne({ _id: id }).lean();
  }
}

export const userRepository = new UserRepository();
