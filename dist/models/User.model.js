"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const gender_enum_1 = require("../enums/gender.enum");
const user_status_enum_1 = require("../enums/user-status.enum");
const UserSchema = new mongoose_1.Schema({
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
        enum: gender_enum_1.EGenders,
    },
    status: {
        type: String,
        enum: user_status_enum_1.EUserStatus,
        required: true,
        default: user_status_enum_1.EUserStatus.inactive,
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("user", UserSchema);
