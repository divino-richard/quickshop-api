"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    firstname: {
        require: true,
        type: String,
    },
    lastname: {
        require: true,
        type: String,
    },
    phoneNumber: {
        require: true,
        type: Number,
    },
    address: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
    },
    password: {
        require: true,
        type: String
    },
    role: {
        require: true,
        type: String,
    },
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('Users', userSchema);
