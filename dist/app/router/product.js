"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('products');
});
router.post('/', (0, authMiddleware_1.authorization)(['SELLER', 'ADMIN']), (req, res) => {
    res.send('product posted');
});
exports.default = router;
