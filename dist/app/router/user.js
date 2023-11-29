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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/become_seller', (0, authMiddleware_1.authorization)(['COSTUMER']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const userData = req.jwt_payload;
        // const sellerRole: UserRole = 'SELLER';
        // const updated = await UserModel.findOneAndUpdate({role: sellerRole}).where({id: userData?._id});
        // return res.status(200).send(updated);
    }
    catch (error) {
        res.status(500).send('Something went wrong. Please try again later.');
    }
}));
exports.default = router;
