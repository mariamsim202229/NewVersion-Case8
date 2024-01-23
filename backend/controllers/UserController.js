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

    if (user.hasOwnProperty("userId")) {
        const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
        res.json({ user: user, userId: userId, token: token });
    } else {
        res.json({})
    }
}

function handleSaveNewUser(req, res) {

    // const { userId } = req.params;
    // Extract other necessary data from the request body
    const { name, password, userId } = req.body;

    console.log(`Request for saveUsers, with id ${userId}, nr`);

    // Validate the incoming data
    if (!name || !password || !userId) {
        res.status(400).send("Missing required fields");
        return;
    }
    // create a new booking object

    const newUser = {
        name: name,
        password: password,
        userId: userId,
    };

    users.saveNewUser(newUser);

    // Respond with the saved booking
    res.status(201).json(newUser);

}
export { handleGetAll, handleLogin, handleSaveNewUser }