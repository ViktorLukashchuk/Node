import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";
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
