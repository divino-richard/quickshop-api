import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";
import { DecodedUserJWTData, UserRole } from "../types/userTypes";

declare global {
    namespace Express {
        export interface Request {
            jwt_payload?: DecodedUserJWTData;
        }
    }
}

export function authorization(allowedRole: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).send('Token is empty');
        }

        verifyToken(token, (error, decoded) => {
            if (error) {
                return res.status(401).send({
                    error: {message: error.message}
                });
            }
            const decodedUserData = decoded as DecodedUserJWTData;
            if (!allowedRole.includes(decodedUserData.role as UserRole)) {
                return res.status(403).send('Forbidden');
            }
            req.jwt_payload = decodedUserData,
            
            next();
        });
    }
}
