import Users from '../models/user-model.js';
const users = new Users();

function handleGetAll(req, res) {
    res.json(users.getAll());    
}

function handleLogin(req, res) {
    const name = req.body.name;
    const password = req.body.password;
    res.json(users.login(name, password));
}

export {handleGetAll, handleLogin}