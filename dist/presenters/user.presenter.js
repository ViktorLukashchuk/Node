"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPresenter = void 0;
const config_1 = require("../configs/config");
class UserPresenter {
    present(data) {
        return {
            _id: data._id,
            name: data.name,
            age: data.age,
            genders: data.genders,
            email: data.email,
            status: data.status,
            avatar: `${config_1.configs.AWS_S3_URL}/${data.avatar}`,
        };
    }
}
exports.userPresenter = new UserPresenter();
