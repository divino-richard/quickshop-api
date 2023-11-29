import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const signUpValidator = [
  body('firstname')
    .notEmpty().withMessage('First name is required')
    .isAlpha().withMessage('First name should contain only alphabetical characters'),
  
  body('lastname')
    .notEmpty().withMessage('Last name is required')
    .isAlpha().withMessage('Last name should contain only alphabetical characters'),
  
    body('phoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .isNumeric().withMessage('Phone number should contain only numeric digits')
    .isLength({ min: 10, max: 15 }).withMessage('Phone number should be between 10 and 15 digits'),
  
  body('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5 }).withMessage('Address should be at least 5 characters long'),
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .isStrongPassword().withMessage('Password is weak'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value: string, { req }) => {
        if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg
        },
      });
    }
    next();
  },
];

export const signInValidator = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  
  function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg
        },
      });
    }
    next();
  }
]
