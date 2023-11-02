import { Router } from 'express';
const userRouter = Router();

import { handleGetAll } from '../controllers/user-controller.js';

userRouter.get('/users', handleGetAll);

export default userRouter;