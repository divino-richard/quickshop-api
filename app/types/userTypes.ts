
export interface UserInfo {
    id?: string,
    firstname: string;
    lastname: string;
    phoneNumber: number;
    address: string;
    email: string;
    password?: string;
    createdAt?: Date,
    updatedAt?: Date,
}

export interface DecodedUserJWTData {
    firstname: string;
    lastname: string;
    phoneNumber: number;
    address: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    iat: number;
    exp: number;
}

export type UserRole = 'ADMIN'|'CUSTOMER'|'SELLER';

export interface UserCredential {
    email: string;
    password: string;
}

export interface ExtendedRequest extends Request {
    jwt_payload: DecodedUserJWTData
}
