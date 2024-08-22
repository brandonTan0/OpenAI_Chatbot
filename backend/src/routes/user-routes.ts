import { Router } from 'express';
import { getAllUsers, userSignup, userLogin, userDelete, verifyUser, logoutUser } from '../controllers/user-controllers.js';
import { signupValidator, validate, loginValidator } from '../utils/validators.js'
import { verifyToken } from '../utils/token-manager.js';

const userRoutes = Router();


userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get('/logout', verifyToken, logoutUser);

userRoutes.delete('/deleteUser', userDelete);

export default userRoutes;