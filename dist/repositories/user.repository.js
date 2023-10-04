"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async getAll() {
        return User_model_1.User.find();
    }
    async findById(id) {
        return User_model_1.User.findById(id);
    }
    create(userBody) {
        return User_model_1.User.create(userBody);
    }
    updateById(id, userBody) {
        return User_model_1.User.findByIdAndUpdate(id, userBody, {
            returnDocument: "after",
        });
    }
    delete(id) {
        return User_model_1.User.deleteOne({ _id: id });
    }
}
exports.userRepository = new UserRepository();
