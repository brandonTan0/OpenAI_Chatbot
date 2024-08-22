import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { deleteChats, generateChatCompletion, getChats } from '../controllers/chat-controllers.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';


// Protected API
const chatRoutes = Router();
chatRoutes.post(
    '/new', 
    validate(chatCompletionValidator), 
    verifyToken, 
    generateChatCompletion,
);

chatRoutes.get('/all-chats', verifyToken, getChats);
chatRoutes.delete('/delete', verifyToken, deleteChats);

export default chatRoutes;