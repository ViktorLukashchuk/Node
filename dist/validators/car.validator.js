"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const producer_enum_1 = require("../enums/producer.enum");
class CarValidator {
}
exports.CarValidator = CarValidator;
_a = CarValidator;
CarValidator.model = joi_1.default.string().min(2).max(30).trim();
CarValidator.year = joi_1.default.number().min(1990).max(2023);
CarValidator.producer = joi_1.default.valid(...Object.values(producer_enum_1.EProducer)).required();
CarValidator.create = joi_1.default.object({
    model: _a.model.required(),
    year: _a.year.required(),
    producer: _a.producer.required(),
});
CarValidator.update = joi_1.default.object({
    model: _a.model,
    year: _a.year,
});
