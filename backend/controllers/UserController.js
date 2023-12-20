import jwt from 'jsonwebtoken';
import { secretKey, authenticateWebToken } from '../utils/authenticate.js';

import Users from '../models/UserModel.js';
const users = new Users();

function handleGetAll(req, res) {
    res.json(users.getAll());    
}

function handleLogin(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    const user = users.login(name, password);

    if (user.hasOwnProperty("id")) {
        const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
        res.json({user: user, token: token});
    } else {
        res.json({})
    }
}

export {handleGetAll, handleLogin}