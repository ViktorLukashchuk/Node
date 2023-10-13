"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async getAll() {
        return User_model_1.User.find().lean();
    }
    async findById(id) {
        return User_model_1.User.findById(id).lean();
    }
    async getOneByParams(params) {
        return User_model_1.User.findOne(params).lean();
    }
    register(dto) {
        return User_model_1.User.create({ ...dto });
    }
    async setStatus(userId, status) {
        await User_model_1.User.updateOne({ _id: userId }, {
            $set: { status },
        }).lean();
    }
    async updateOneById(userId, dto) {
        return User_model_1.User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
    updateById(id, userBody) {
        return User_model_1.User.findByIdAndUpdate(id, userBody, {
            returnDocument: "after",
        }).lean();
    }
    delete(id) {
        return User_model_1.User.deleteOne({ _id: id }).lean();
    }
}
exports.userRepository = new UserRepository();
