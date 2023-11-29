"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidator = exports.signUpValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signUpValidator = [
    (0, express_validator_1.body)('firstname')
        .notEmpty().withMessage('First name is required')
        .isAlpha().withMessage('First name should contain only alphabetical characters'),
    (0, express_validator_1.body)('lastname')
        .notEmpty().withMessage('Last name is required')
        .isAlpha().withMessage('Last name should contain only alphabetical characters'),
    (0, express_validator_1.body)('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .isNumeric().withMessage('Phone number should contain only numeric digits')
        .isLength({ min: 10, max: 15 }).withMessage('Phone number should be between 10 and 15 digits'),
    (0, express_validator_1.body)('address')
        .notEmpty().withMessage('Address is required')
        .isLength({ min: 5 }).withMessage('Address should be at least 5 characters long'),
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isStrongPassword().withMessage('Password is weak'),
    (0, express_validator_1.body)('confirmPassword')
        .notEmpty().withMessage('Please confirm your password')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    function (req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.signInValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    function (req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
