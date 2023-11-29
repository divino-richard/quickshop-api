"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const password_1 = require("../utils/password");
const userModel_1 = require("../model/userModel");
const auth_1 = require("../utils/auth");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = req.body;
            const defaultRole = 'COSTUMER';
            const hashedPassword = yield (0, password_1.hashPassword)(userInfo.password);
            userInfo.password = hashedPassword;
            const userModel = new userModel_1.UserModel(Object.assign(Object.assign({}, userInfo), { role: defaultRole }));
            const userData = yield userModel.save();
            // prevent password to be exposed
            const userDataObject = userData.toObject();
            delete userDataObject.password;
            (0, auth_1.signToken)(userDataObject, (error, token) => {
                if (error) {
                    return res.status(500).send('Something went wrong. Please try again later.');
                }
                ;
                return res.status(201).send({ token, data: userDataObject });
            });
        }
        catch (error) {
            return res.status(500).send('Something went wrong. Please try again later.');
        }
    });
}
exports.signUp = signUp;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const credential = req.body;
            const foundUser = yield userModel_1.UserModel.findOne({ email: credential.email });
            if (!foundUser) {
                return res.status(400).send({ message: 'User not found!' });
            }
            if (foundUser.password) {
                const isVerified = yield (0, password_1.verifyPassword)(credential.password, foundUser.password);
                if (!isVerified) {
                    return res.status(401).send({ message: 'Invalid password' });
                }
                const userDataObject = foundUser.toObject();
                delete userDataObject.password;
                (0, auth_1.signToken)(userDataObject, (error, token) => {
                    if (error) {
                        return res.status(500).send('Something went wrong. Please try again later.');
                    }
                    ;
                    return res.status(200).send({ token, data: userDataObject });
                });
            }
            else {
                return res.status(500).send('Something went wrong. Please try again later.');
            }
        }
        catch (error) {
            return res.status(500).send('Something went wrong. Please try again later.');
        }
    });
}
exports.signIn = signIn;
