import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
import { verifyUser } from '../controllers/user-controllers.js';

export const createToken = (id: string, email: string, expiresIn: string | number) => {
    try {
        const payload = { id, email };
        console.log("Payload: ", payload);  // Debug 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn
        });
        console.log("createToken(token): ", token); // Debug
        return token;
    } catch(err) {
        console.log(err);
        return `Unable to create token: ${err.message}`;
    }
};

// User Token Verification
export const verifyToken = async (
    req: Request, 
    res: Response, 
    next: NextFunction,
) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received", token: token || null });
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if(err) {
                reject();
                return res.status(401).json({ message: "Token Expired" });
            } else {
                console.log("Token verification successful");
                resolve();
                res.locals.jwtData = success;
                return next( );
            }
        });
    });
};