import { Router } from 'express';
const userRouter = Router();

import { handleGetAllUsers, handleLogin, handleGetUserByUsername, handleDeleteUserSession } from '../controllers/UserController.js';

userRouter.get('/users', handleGetAllUsers);
userRouter.post('/login', handleLogin);
userRouter.get("/users/:username", handleGetUserByUsername);
userRouter.delete ("/delete/:username", handleDeleteUserSession)

export default userRouter;

