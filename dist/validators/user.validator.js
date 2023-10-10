"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regexp_constants_1 = require("../constants/regexp.constants");
const gender_enum_1 = require("../enums/gender.enum");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.firstName = joi_1.default.string().min(2).max(50).trim();
UserValidator.age = joi_1.default.number().min(18).max(150);
UserValidator.genders = joi_1.default.valid(...Object.values(gender_enum_1.EGenders)).required();
UserValidator.email = joi_1.default.string().regex(regexp_constants_1.regexConstant.EMAIL).trim().required();
UserValidator.password = joi_1.default.string().trim();
UserValidator.update = joi_1.default.object({
    name: _a.firstName,
    age: _a.age,
    genders: _a.genders,
});
UserValidator.register = joi_1.default.object({
    name: _a.firstName.required(),
    age: _a.age.required(),
    genders: _a.genders.required(),
    email: _a.email.required(),
    password: _a.password.required(),
});
UserValidator.login = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
UserValidator.forgotPassword = joi_1.default.object({
    email: _a.email.required(),
});
