"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../configs/config");
const email_constant_1 = require("../constants/email.constant");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            from: "NO REPLY",
            service: "gmail",
            auth: {
                user: config_1.configs.NO_REPLY_EMAIL,
                pass: config_1.configs.NO_REPLY_PASS,
            },
        });
        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: path_1.default.join(process.cwd(), "src", "email-templates", "layouts"),
                partialsDir: path_1.default.join(process.cwd(), "src", "email-templates", "partials"),
            },
            viewPath: path_1.default.join(process.cwd(), "src", "email-templates", "views"),
            extName: ".hbs",
        };
        this.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(hbsOptions));
    }
    async sendEmail(email, emailAction, context) {
        const { subject, templateName } = email_constant_1.templates[emailAction];
        context.frontUrl = config_1.configs.FRONT_URL;
        const mailOptions = {
            to: email,
            subject: subject,
            template: templateName,
            context,
        };
        return await this.transporter.sendMail(mailOptions);
    }
}
exports.emailService = new EmailService();
