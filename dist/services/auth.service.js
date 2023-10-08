"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_errors_1 = require("../errors/api.errors");
const token_repository_1 = require("../repositories/token.repository");
const user_repository_1 = require("../repositories/user.repository");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(dto) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(dto.password);
            const user = await user_repository_1.userRepository.register({
                ...dto,
                password: hashedPassword,
            });
            return user;
        }
        catch (e) {
            throw new api_errors_1.ApiError(e.message, e.status);
        }
    }
    async login(dto) {
        try {
            const user = await user_repository_1.userRepository.getOneByParams({ email: dto.email });
            if (!user) {
                throw new api_errors_1.ApiError("Invalid credentials provided", 401);
            }
            const isMatched = await password_service_1.passwordService.compare(dto.password, user.password);
            if (!isMatched) {
                throw new api_errors_1.ApiError("Invalid credentials provided", 401);
            }
            const tokensPair = await token_service_1.tokenService.generateTokenPair({
                userId: user._id,
                name: user.name,
            });
            await token_repository_1.tokenRepository.create({ ...tokensPair, _userId: user._id });
            return tokensPair;
        }
        catch (e) {
            throw new api_errors_1.ApiError(e.message, e.status);
        }
    }
    async refresh(payload, refreshToken) {
        try {
            const tokensPair = token_service_1.tokenService.generateTokenPair({
                userId: payload.userId,
                name: payload.name,
            });
            await Promise.all([
                token_repository_1.tokenRepository.create({ ...tokensPair, _userId: payload.userId }),
                token_repository_1.tokenRepository.deleteOne({ refreshToken }),
            ]);
            return tokensPair;
        }
        catch (e) {
            throw new api_errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
