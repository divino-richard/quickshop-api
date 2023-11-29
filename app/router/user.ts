import express, { Request, Response } from 'express';
import { authorization } from '../middleware/authMiddleware';
import { UserModel } from '../model/userModel';
import {UserRole } from '../types/userTypes';

const router = express.Router();

router.post('/become_seller', authorization(['CUSTOMER']), async (req: Request, res: Response) => {
    try {
        const userData = req.jwt_payload;
        const sellerRole: UserRole = 'SELLER';
        await UserModel.findOneAndUpdate({role: sellerRole}).where({id: userData?._id});
        return res.status(200).send({
            error: {message: 'Your are now a seller!'}
        });
    } catch (error) {
        res.status(500).send({
            error: {message: 'Something went wrong. Please try again later.'} 
        });
    }
});

export default router;
