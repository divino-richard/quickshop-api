import express, { Request, Response } from 'express';
import { signUpValidator, signInValidator } from '../middleware/validators/authValidator';
import { signUp, signIn } from '../controller/authController';
import { authorization } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signin', signInValidator, (req: Request, res: Response) => {
    signIn(req, res);
});

router.post('/signup', signUpValidator, (req: Request, res: Response) => {
    signUp(req, res);
});

export default router;
