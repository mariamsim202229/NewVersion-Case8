import { Router } from 'express';
const userRouter = Router();

import { handleGetAllUsers, handleLogin, handleGetUserByUsername } from '../controllers/UserController.js';

userRouter.get('/users', handleGetAllUsers);
userRouter.post('/login', handleLogin);
userRouter.get("/users/:username", handleGetUserByUsername);

export default userRouter;

