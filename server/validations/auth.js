// Core
import { body } from 'express-validator';

export const signupValidation = [
    body('email', 'Некоректний формат пошти').isEmail(),
    body('password', 'Некоректний пароль').isLength({ min: 6, max: 30 }),
    body('name', 'Некоректне ім\'я').isLength({ min: 2, max: 50 }),
];

export const signinValidation = [
    body('email', 'Некоректний дані').isEmail(),
    body('password', 'Некоректний дані').isLength({ min: 6, max: 30 }),
];
