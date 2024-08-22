import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

// Get all users
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find();
        return res.status(200).json({message: "Success", users});
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Failed Get_All_Users", cause: err});
    }
}

// Create new user into DB
export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name,email,password } = req.body;

        // Checks if user is already registered
        const existingUser = await User.findOne({ email} );
        if (existingUser) return res.status(401).send("Email is already registered");

        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // create token and store cookies
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(201).json({message: "Success", name: user.name, email: user.email })
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Failed Sign-up", cause: err})
    }
}

// User Login
export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(401).send("Email is not registered");

        // Password authentication
        const isPasswordValid= await compare(password, user.password);
        if(!isPasswordValid) return res.status(403).send("Incorrect Password");

        // Token authorization and store cookie
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({message: "Success", name: user.name, email: user.email });
    } catch(err) {
        console.log(err);
        return res.status(500).json({messge: "Failed to login", cause: err});
    }
}

// Verify User
export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User not registered or Token malfunction");
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions did not match");
        }
        return res.status(200).json({ message: "Success", name: user.name, email: user.email });
    } catch(err) {
        console.log(err);
        return res.status(401).json({ message: "Failed", cause: err.message });
    }
}

// User Logout
export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User not registered or Token malfunction");
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions did not match");
        }
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "Success", name: user.name, email: user.email });
    } catch(err) {
        console.log(err);
        return res.status(401).json({ message: "Failed", cause: err.message });
    }

}

// Delete user from DB
export const userDelete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.body;
        const result = await User.findByIdAndDelete(id);
        return res.status(200).json({message: "Success", user_deleted: result});
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Failed Delete_user", cause: err});

    }
}
