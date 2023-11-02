import Users from '../models/user-model.js';
const users = new Users();

function handleGetAll(req, res) {
    res.json(users.getAll());    
}

export {handleGetAll}