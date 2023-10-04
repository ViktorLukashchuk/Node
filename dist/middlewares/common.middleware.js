"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const api_errors_1 = require("../errors/api.errors");
class CommonMiddleware {
    async isIdValid(req, res, next) {
        try {
            const id = req.params.id;
            if (!mongoose_1.default.isObjectIdOrHexString(id)) {
                throw new api_errors_1.ApiError("Not Valid ID", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isBodyValid(validator) {
        return (req, res, next) => {
            try {
                const { error, value } = validator.validate(req.body);
                if (error) {
                    throw new api_errors_1.ApiError(error.message, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
