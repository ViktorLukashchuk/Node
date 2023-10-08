"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = exports.TokenRepository = void 0;
const Token_model_1 = require("../models/Token.model");
class TokenRepository {
    async create(dto) {
        return await Token_model_1.Token.create(dto);
    }
    async findOne(params) {
        return Token_model_1.Token.findOne(params);
    }
    async deleteOne(params) {
        await Token_model_1.Token.deleteOne(params);
    }
}
exports.TokenRepository = TokenRepository;
exports.tokenRepository = new TokenRepository();
