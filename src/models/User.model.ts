import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { EUserStatus } from "../enums/user-status.enum";
import { IUser } from "../types/user.type";
const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Age too low"],
      max: [100, "Age too high"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      enum: EUserStatus,
      required: true,
      default: EUserStatus.inactive,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("user", UserSchema);
