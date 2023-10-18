"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOldTokens = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const api_errors_1 = require("../errors/api.errors");
const token_repository_1 = require("../repositories/token.repository");
dayjs_1.default.extend(utc_1.default);
const tokensRemover = async function () {
    try {
        const previousMonth = (0, dayjs_1.default)().utc().subtract(30, "d");
        await token_repository_1.tokenRepository.deleteManyByParams({
            createdAt: { $lte: previousMonth },
        });
    }
    catch (e) {
        throw new api_errors_1.ApiError(e.message, e.status);
    }
};
exports.removeOldTokens = new cron_1.CronJob("* */10 * * * *", tokensRemover);