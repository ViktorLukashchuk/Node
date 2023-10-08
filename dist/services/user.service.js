"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getAll() {
        const users = await user_repository_1.userRepository.getAll();
        return users;
    }
    async updateById(id, userBody) {
        const user = await user_repository_1.userRepository.updateById(id, userBody);
        return user;
    }
    async deleteById(id) {
        return user_repository_1.userRepository.delete(id);
    }
}
exports.userService = new UserService();
