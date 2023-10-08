"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_errors_1 = require("../errors/api.errors");
const token_repository_1 = require("../repositories/token.repository");
const token_service_1 = require("../services/token.service");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new api_errors_1.ApiError("No Token!", 401);
            }
            const payload = token_service_1.tokenService.checkToken(accessToken, "access");
            const entity = await token_repository_1.tokenRepository.findOne({ accessToken });
            if (!entity) {
                throw new api_errors_1.ApiError("Token not valid!", 401);
            }
            req.res.locals.tokenPayload = payload;
            req.res.locals.accessToken = accessToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken) {
                throw new api_errors_1.ApiError("No Token!", 401);
            }
            const payload = token_service_1.tokenService.checkToken(refreshToken, "refresh");
            const entity = await token_repository_1.tokenRepository.findOne({ refreshToken });
            if (!entity) {
                throw new api_errors_1.ApiError("Token not valid!", 401);
            }
            req.res.locals.tokenPayload = payload;
            req.res.locals.refreshToken = refreshToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
