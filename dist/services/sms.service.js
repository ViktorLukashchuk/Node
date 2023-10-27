"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsService = void 0;
const twilio_1 = require("twilio");
const config_1 = require("../configs/config");
class SmsService {
    constructor(client = new twilio_1.Twilio(config_1.configs.TWILIO_ACCOUNT_SID, config_1.configs.TWILIO_AUTH_TOKEN)) {
        this.client = client;
    }
    async sendSms(number, message) {
        try {
            const result = await this.client.messages.create({
                body: message,
                to: number,
                messagingServiceSid: config_1.configs.TWILIO_SERVICE_SID,
            });
            console.log(result);
        }
        catch (e) {
            console.error(e.message);
        }
    }
}
exports.smsService = new SmsService();
