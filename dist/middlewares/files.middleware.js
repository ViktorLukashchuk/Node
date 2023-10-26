"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMiddleware = void 0;
const file_config_1 = require("../configs/file.config");
const api_errors_1 = require("../errors/api.errors");
class FilesMiddleware {
    async isAvatarValid(req, res, next) {
        try {
            if (Array.isArray(req.files.avatar)) {
                throw new api_errors_1.ApiError("Avatar is not allowed to be an array of images", 400);
            }
            const { size, mimetype } = req.files.avatar;
            if (size > file_config_1.avatarConfig.MAX_SIZE) {
                throw new api_errors_1.ApiError("File is too big", 400);
            }
            if (!file_config_1.avatarConfig.MIMETYPES.includes(mimetype)) {
                throw new api_errors_1.ApiError("File has invalid format", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.fileMiddleware = new FilesMiddleware();
