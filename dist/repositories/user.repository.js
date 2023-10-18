"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_model_1 = require("../models/User.model");
class UserRepository {
    async getAll() {
        return User_model_1.User.find().lean();
    }
    async findById(id) {
        return User_model_1.User.findById(id).lean();
    }
    async getOneByParams(params) {
        return User_model_1.User.findOne(params).lean();
    }
    register(dto) {
        return User_model_1.User.create({ ...dto });
    }
    async setStatus(userId, status) {
        await User_model_1.User.updateOne({ _id: userId }, {
            $set: { status },
        }).lean();
    }
    async updateOneById(userId, dto) {
        return User_model_1.User.findByIdAndUpdate(userId, dto, {
            returnDocument: "after",
        });
    }
    updateById(id, userBody) {
        return User_model_1.User.findByIdAndUpdate(id, userBody, {
            returnDocument: "after",
        }).lean();
    }
    delete(id) {
        return User_model_1.User.deleteOne({ _id: id }).lean();
    }
    findWithoutActivityAfterDate(date) {
        return User_model_1.User.aggregate([
            {
                $lookup: {
                    from: "tokens",
                    localField: "_id",
                    foreignField: "_userId",
                    as: "tokens",
                },
            },
            {
                $match: {
                    tokens: {
                        $not: {
                            $elemMatch: {
                                createdAt: { $gte: date },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                },
            },
        ]);
    }
}
exports.userRepository = new UserRepository();
