import { Router } from 'express';
const userRouter = Router();

import { handleGetAll, handleLogin } from '../controllers/user-controller.js';

userRouter.get('/users', handleGetAll);
userRouter.post('/user/login', handleLogin);

export default userRouter;