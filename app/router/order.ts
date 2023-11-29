import express, { Request, Response } from "express";
import { authorization } from "../middleware/authMiddleware";
import { cancelOrderValidator, orderStatusValidator, orderValidator, updateOrderPaymentValidator, updateStatusValidator } from "../middleware/validators/orderValidator";
import order from "../controller/order.controller";

const router = express.Router();

router.post('/',
    authorization(['CUSTOMER']),
    orderValidator,
    (req: Request, res: Response) => {
        
    order.create(req, res);
});

router.get('/:_limit/:_offset', 
    authorization(['ADMIN', 'SELLER', 'CUSTOMER']),
    (req: Request, res: Response) => {

    order.getAll(req, res);
});

router.get('/status',
    authorization(['ADMIN', 'CUSTOMER', 'SELLER']),
    orderStatusValidator,
    (req: Request, res: Response) => {
    
    order.getByStatus(req, res);
})

router.put('/status',
    authorization(['ADMIN', 'SELLER']),
    updateStatusValidator,
    (req: Request, res: Response) => {

        order.updateOrderStatus(req, res);
});

router.put('/payment/status', 
    authorization(['ADMIN', 'SELLER']),
    updateOrderPaymentValidator,
    (req: Request, res: Response) => {

        order.updatePaymentStatus(req, res);
})

router.delete('/cancel', 
    authorization(['CUSTOMER']),
    cancelOrderValidator,
    (req: Request, res: Response) => {

        order.cancelOrder(req, res);
})

export default router;
