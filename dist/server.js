"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./app/router/product"));
const auth_1 = __importDefault(require("./app/router/auth"));
const user_1 = __importDefault(require("./app/router/user"));
const db_1 = require("./app/config/db");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/auth', auth_1.default);
app.use('/user', user_1.default);
app.use('/product', product_1.default);
(0, db_1.dbConnect)().then(() => {
    console.log('🚀Connected with database');
    app.listen(PORT, () => {
        console.log(`🚀Server running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log('Unable to connect with the database');
    console.log(error);
});
