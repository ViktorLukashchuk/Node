"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationToOldVisitors = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const email_action_enum_1 = require("../enums/email.action.enum");
const api_errors_1 = require("../errors/api.errors");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("../services/email.service");
dayjs_1.default.extend(utc_1.default);
const handler = async function () {
    try {
        const date = (0, dayjs_1.default)().utc().subtract(1, "d");
        const users = await user_repository_1.userRepository.findWithoutActivityAfterDate(date.toISOString());
        await Promise.all([
            users.map(async (user) => {
                await email_service_1.emailService.sendEmail(user.email, email_action_enum_1.EEmailAction.OLD_VISIT, {
                    name: user.name,
                });
            }),
        ]);
    }
    catch (e) {
        throw new api_errors_1.ApiError(e.message, e.status);
    }
};
exports.sendNotificationToOldVisitors = new cron_1.CronJob("* */10 * * * *", handler);
