"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_errors_1 = require("../errors/api.errors");
const User_model_1 = require("../models/User.model");
const user_repository_1 = require("../repositories/user.repository");
const s3_service_1 = require("./s3.service");
class UserService {
    async getAll() {
        const users = await user_repository_1.userRepository.getAll();
        return users;
    }
    async getAllWithPagination(query) {
        try {
            const queryStr = JSON.stringify(query);
            const queryObj = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
            const { page = 1, limit = 5, sortedBy = "createdAt", ...searchObject } = queryObj;
            const skip = +limit * (+page - 1);
            const [users, itemsFound] = await Promise.all([
                User_model_1.User.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
                User_model_1.User.count(searchObject),
            ]);
            return {
                page: +page,
                limit: +limit,
                itemsFound: itemsFound,
                data: users,
            };
        }
        catch (e) {
            throw new api_errors_1.ApiError(e.message, e.status);
        }
    }
    async updateById(id, userBody) {
        const user = await user_repository_1.userRepository.updateById(id, userBody);
        return user;
    }
    async deleteById(id) {
        return user_repository_1.userRepository.delete(id);
    }
    async uploadAvatar(avatar, userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (user.avatar) {
            await s3_service_1.s3Service.deleteFile(user.avatar);
        }
        const filePath = await s3_service_1.s3Service.uploadFile(avatar, s3_service_1.EFileTypes.User, userId);
        const updatedUser = await user_repository_1.userRepository.updateOneById(userId, {
            avatar: filePath,
        });
        return updatedUser;
    }
}
exports.userService = new UserService();
