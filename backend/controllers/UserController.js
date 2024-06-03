import crypto from 'crypto';

import Users from '../models/UserModel.js';
const users = new Users();

const userSessions = {};

function handleLogin(req, res) {
    const { username, password } = req.body;
    const isAuthenticated = users.authenticate(username, password);

    if (!isAuthenticated) {
        console.log("Signin failed");
        return res.status(401).send("Not authenticated");
    }

    // Register a new session
    const sessionKey = crypto.randomBytes(20).toString('base64');
    userSessions[username] = sessionKey;
    res.send({ sessionKey });
}
function handleGetAllUsers(req, res) {
    res.json(users.getAllUsers());
}

function handleGetUserByUsername(req, res) {
    if (!Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const { username } = req.params;

    const foundUser = users.getUserByUsername(username);

    if (!foundUser) {
        return res.status(404).send("User Not found");
    }
    return res.send(foundUser);
}

export { userSessions, handleGetAllUsers, handleGetUserByUsername, handleLogin }