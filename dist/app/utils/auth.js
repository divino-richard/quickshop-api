"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'my-private-key';
function signToken(userData, callback) {
    jsonwebtoken_1.default.sign(userData, SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' }, (error, token) => {
        if (error) {
            return callback(error, undefined);
        }
        ;
        callback(null, token);
    });
}
exports.signToken = signToken;
function verifyToken(token, callback) {
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            return callback(error, undefined);
        }
        ;
        callback(null, decoded);
    });
}
exports.verifyToken = verifyToken;
