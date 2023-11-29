import {Request, Response} from 'express';
import { UserCredential, UserInfo, UserRole } from '../types/userTypes';
import { hashPassword, verifyPassword } from '../utils/password';
import { UserModel } from '../model/userModel';
import { signToken } from '../utils/auth';

export async function signUp(req: Request, res: Response) {
    try {
        const userInfo: UserInfo = req.body;
        const defaultRole: UserRole = 'CUSTOMER'; 

        const hashedPassword = await hashPassword(userInfo.password!);
        userInfo.password = hashedPassword;
        
        const userModel = new UserModel({...userInfo, role: defaultRole});
        const userData = await userModel.save();
    
        // prevent password to be exposed
        const userDataObject = userData.toObject();
        delete userDataObject.password;

        signToken(userDataObject as UserInfo, (error, token) => {
            if (error) {
                return res.status(500).send('Something went wrong. Please try again later.');
            };
            return res.status(201).send({token, user: userDataObject});
        })

    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again later.');
    }
}

export async function signIn(req: Request, res: Response) {
    try {
        const credential: UserCredential = req.body;
        const foundUser = await UserModel.findOne({email: credential.email});
        
        if (!foundUser) {
            return res.status(400).send({
                error: {message: 'User not found!'}
            });
        }

        if(foundUser.password) {
            const isVerified = await verifyPassword(credential.password, foundUser.password);

            if (!isVerified) {
                return res.status(401).send({
                    error: {message: 'Incorrect password'}
                });
            }

            const userDataObject = foundUser.toObject();
            delete userDataObject.password;

            signToken(userDataObject as UserInfo, (error, token) => {
                if (error) {
                    return res.status(500).send('Something went wrong. Please try again later.');
                };
                return res.status(200).send({token, user: userDataObject});
            });
        } else {
            return res.status(500).send('Something went wrong. Please try again later.');
        }
    } catch (error) {
        return res.status(500).send('Something went wrong. Please try again later.');
    }
}
