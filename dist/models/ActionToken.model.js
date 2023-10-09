"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const EEmailAction_1 = require("../enums/EEmailAction");
const User_model_1 = require("./User.model");
const tokensSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: EEmailAction_1.EActionTokenType,
    },
    _userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: User_model_1.User,
    },
}, { timestamps: true, versionKey: false });
exports.ActionToken = (0, mongoose_1.model)("action-token", tokensSchema);
