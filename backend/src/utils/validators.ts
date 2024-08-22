import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()) break;
        }
        //await Promise.all(validations.map(validation=>validation.run(req))); // For parallel execution 
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() })
    };
};

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password: Minimum length 6"),
]

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];


export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];

