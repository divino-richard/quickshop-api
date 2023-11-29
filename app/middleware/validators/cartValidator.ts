import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const cartValidator = [
    body('product')
        .notEmpty().withMessage('Select a product to be added in the cart')
        .isString().withMessage('Invalid description format'),
    body('quantity')
        .notEmpty().withMessage('Please provide quantity')
        .isNumeric().withMessage('Quantity must be a numeric'),
    
    function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {message: errors.array()[0].msg}
            });
        }
        next();
    }
]

export const cartUpdateValidator = [
    body('quantity')
        .notEmpty().withMessage('Please provide quantity')
        .isNumeric().withMessage('Quantity must be a numeric'),
    
    function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {message: errors.array()[0].msg}
            });
        }
        next();
    }
]
