import { Router } from 'express';
const userRouter = Router();

import { handleGetAll, handleLogin } from '../controllers/user-controller.js';
import { authenticateWebToken } from '../utils/authenticate.js';

userRouter.get('/users', authenticateWebToken, handleGetAll);
userRouter.post('/user/login', handleLogin);

export default userRouter;