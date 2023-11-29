import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const customerReviewValidator = {
    create: [
        body('productId')
            .notEmpty().withMessage('Please provide product id')
            .isMongoId().withMessage('Invalid product id'),
        body('starRate')
            .notEmpty().withMessage('Star rate is required')
            .isInt({min: 1, max: 5}).withMessage('Star rating must be minimum of 1 and maximum of 5'),
        body('message')
            .optional({nullable: true})
            .isLength({max: 1000}).withMessage('Message must not exceed to 1000 characters'),

        function(req: Request, res: Response, next: NextFunction) {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: errors.array()[0].msg
                    }
                })
            }
            next();
        }
    ],
    update: [
        body('starRate')
            .notEmpty().withMessage('Star rate is required')
            .isInt({min: 1, max: 5}).withMessage('Star rating must be minimum of 1 and maximum of 5'),
        body('message')
            .optional({nullable: true})
            .isLength({max: 1000}).withMessage('Message must not exceed to 1000 characters'),

        function(req: Request, res: Response, next: NextFunction) {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: errors.array()[0].msg
                    }
                })
            }
            next();
        }
    ]
}

export default customerReviewValidator;
