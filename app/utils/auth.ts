import jwt, { SignCallback, VerifyCallback } from 'jsonwebtoken';
import { DecodedUserJWTData, UserInfo } from '../types/userTypes';

const SECRET_KEY = 'my-private-key';

export function signToken(userData: UserInfo, callback: SignCallback) {
    jwt.sign(userData, SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h'}, (error, token) => {
        if(error) {
            return callback(error, undefined);
        };
        callback(null, token);
    });
}

export function verifyToken(token: string, callback: VerifyCallback) {
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if(error) {
            return callback(error, undefined);
        };
        callback(null, decoded);
    });
}
