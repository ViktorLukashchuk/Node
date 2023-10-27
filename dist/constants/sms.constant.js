"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsTemplates = void 0;
const sms_action_enum_1 = require("../enums/sms.action.enum");
exports.smsTemplates = {
    [sms_action_enum_1.ESmsAction.REGISTER]: (name) => `Hey, ${name}! \n Great to see u in our platform.`,
};
