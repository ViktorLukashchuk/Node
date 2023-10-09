"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTokenRepository = exports.ActionTokenRepository = void 0;
const ActionToken_model_1 = require("../models/ActionToken.model");
class ActionTokenRepository {
    async create(dto) {
        return await ActionToken_model_1.ActionToken.create(dto);
    }
    async findOne(params) {
        return ActionToken_model_1.ActionToken.findOne(params);
    }
    async deleteOne(params) {
        await ActionToken_model_1.ActionToken.deleteOne(params);
    }
    async deleteManyByUserIdAndType(userId, type) {
        await ActionToken_model_1.ActionToken.deleteMany({ _userId: userId, type });
    }
}
exports.ActionTokenRepository = ActionTokenRepository;
exports.actionTokenRepository = new ActionTokenRepository();
