import { Router } from 'express';
const userRouter = Router();

import { handleGetAll, handleLogin, handleSaveNewUser } from '../controllers/UserController.js';
import { authenticateWebToken } from '../utils/authenticate.js';

userRouter.get('/users', handleGetAll);
userRouter.post('/user/login', authenticateWebToken, handleLogin);
userRouter.post('/user/register', handleSaveNewUser);

export default userRouter;

