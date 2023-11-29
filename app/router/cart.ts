import express, { Request, Response } from 'express';
import { authorization } from '../middleware/authMiddleware';
import { cartUpdateValidator, cartValidator } from '../middleware/validators/cartValidator';
import cart from '../controller/cart.controller';

const router = express.Router();

router.post('/',
    authorization(['CUSTOMER']),
    cartValidator,
    (req: Request, res: Response) => {
    
    cart.create(req, res);
});
router.get('/',
    authorization(['CUSTOMER']),
    (req: Request, res: Response) => {
    
    cart.getAllByUserId(req, res);
});
router.put('/:id',
    authorization(['CUSTOMER']),
    cartUpdateValidator,
    (req: Request, res: Response) => {
    
    cart.update(req, res);
});
router.delete('/:id',
    authorization(['CUSTOMER']),
    (req: Request, res: Response) => {
    
    cart.delete(req, res);
});

export default router;
