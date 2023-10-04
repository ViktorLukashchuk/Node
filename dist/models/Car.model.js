"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const producer_enum_1 = require("../enums/producer.enum");
const carSchema = new mongoose_1.Schema({
    year: {
        type: Number,
    },
    model: {
        type: String,
        required: true,
    },
    producer: {
        type: String,
        enum: producer_enum_1.EProducer,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Car = (0, mongoose_1.model)("car", carSchema);
