import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { configureOpenAI } from '../config/openai-config.js';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).json({ message: "User not recognized OR Token malfunctioned" });
        }
        // Grab chats of the user
        const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        // Send all chats from new one to OpenAI API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);

        // Get latest reponse
        const chatReponse = await openai.createChatCompletion({ 
            model: "gpt-4o-mini",
            messages: chats,
        })
        user.chats.push(chatReponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

export const getChats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User not recognized OR Token malfunctioned");
        }
        if(user._id.toString() != res.locals.jwtData.id) {
            return res.status(401).send("Permissions did not match");
        }
        // Grab chats of the user
        return res.status(200).json({ chats: user.chats });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction  
) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User not recognized OR Token malfunction");
        }
        if(user._id.toString() != res.locals.jwtData.id) {
            return res.status(401).send("Permissions did not match");
        }
        //@ts-ignore
        user.chats = []; 
        user.save();
        return res.status(200).json({ message: "Success" });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Failed", cause: err.message });
    }
};