"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_presenter_1 = require("../presenters/user.presenter");
const user_service_1 = require("../services/user.service");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await user_service_1.userService.getAllWithPagination(req.query);
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const user = req.res.locals;
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const updatedUser = await user_service_1.userService.updateById(req.params.id, req.body);
            return res.status(201).json(updatedUser);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            await user_service_1.userService.deleteById(req.params.id);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            const { userId } = req.params;
            const avatar = req.files.avatar;
            const user = await user_service_1.userService.uploadAvatar(avatar, userId);
            const response = user_presenter_1.userPresenter.present(user);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
