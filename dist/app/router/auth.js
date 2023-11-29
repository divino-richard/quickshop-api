"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authValidator_1 = require("../middleware/validators/authValidator");
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.post('/signin', authValidator_1.signInValidator, (req, res) => {
    (0, authController_1.signIn)(req, res);
});
router.post('/signup', authValidator_1.signUpValidator, (req, res) => {
    (0, authController_1.signUp)(req, res);
});
exports.default = router;
