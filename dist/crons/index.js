"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronRunner = void 0;
const remove_old_token_cron_1 = require("./remove-old-token.cron");
const send_notification_to_old_visitors_1 = require("./send-notification-to-old-visitors");
const cronRunner = () => {
    remove_old_token_cron_1.removeOldTokens.start();
    send_notification_to_old_visitors_1.sendNotificationToOldVisitors.start();
};
exports.cronRunner = cronRunner;
