import customerReview from "../controller/customerReview.controller";
import express, { Request, Response } from 'express';
import { authorization } from "../middleware/authMiddleware";
import customerReviewValidator from "../middleware/validators/customerReviewValidator";

const router = express.Router();

router.post('/', 
    authorization(['CUSTOMER']),
    customerReviewValidator.create,
    (req: Request, res: Response) => {
        
    customerReview.create(req, res);
})

router.put('/:id', 
    authorization(['CUSTOMER']),
    customerReviewValidator.update,
    (req: Request, res: Response) => {
    
    customerReview.update(req, res);
});

router.delete('/:id', 
    authorization(['CUSTOMER']),
    (req: Request, res: Response) => {
    
    customerReview.delete(req, res);
});

export default router;
