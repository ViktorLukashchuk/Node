"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = exports.EFileTypes = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const path = __importStar(require("path"));
const config_1 = require("../configs/config");
var EFileTypes;
(function (EFileTypes) {
    EFileTypes["User"] = "user";
    EFileTypes["Car"] = "car";
})(EFileTypes || (exports.EFileTypes = EFileTypes = {}));
class S3Service {
    constructor(s3Client = new client_s3_1.S3Client({
        region: config_1.configs.AWS_S3_REGION,
        credentials: {
            accessKeyId: config_1.configs.AWS_S3_ACCESS_KEY,
            secretAccessKey: config_1.configs.AWS_S3_SECRET_KEY,
        },
    })) {
        this.s3Client = s3Client;
    }
    async uploadFile(file, itemType, itemId) {
        const filePath = this.buildPath(file.name, itemType, itemId);
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Key: filePath,
            Bucket: config_1.configs.AWS_S3_BUCKET,
            Body: file.data,
            ContentType: file.mimetype,
            ACL: "public-read",
        }));
        return filePath;
    }
    async deleteFile(fileKey) {
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
            Key: fileKey,
            Bucket: config_1.configs.AWS_S3_BUCKET,
        }));
    }
    buildPath(fileName, fileType, fileId) {
        return `${fileType}/${fileId}/${crypto_1.default.randomUUID()}${path.extname(fileName)}`;
    }
}
exports.s3Service = new S3Service();
