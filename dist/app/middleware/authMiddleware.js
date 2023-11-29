"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const auth_1 = require("../utils/auth");
function authorization(allowedRole) {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).send('Token is empty');
        }
        (0, auth_1.verifyToken)(token, (error, decoded) => {
            if (error) {
                return res.status(401).send(error.message);
            }
            const decodedUserData = decoded;
            if (!allowedRole.includes(decodedUserData.role)) {
                return res.status(403).send('Forbidden');
            }
            req.jwt_payload = decodedUserData,
                next();
        });
    };
}
exports.authorization = authorization;
