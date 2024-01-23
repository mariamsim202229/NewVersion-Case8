import fs from 'fs';
import path from 'path';

const userDb = path.normalize(path.resolve('./data/users.json'));

class User {

    constructor() {
    }
    
    readData() {
        const data = fs.readFileSync(userDb, {encoding: 'utf-8'}); 
        if (!data) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }

    saveData(data) {
        return fs.writeFileSync(userDb, JSON.stringify(data));
    }

    getAll() {
        const users = this.readData();
        if (!users) {
            return [];
        }
        return users;
    }

    login(name, password) {
        const users = this.readData();
        let obj = {};
        users.forEach(user => {
            if (user.name === name && user.password === password) {
                user.loginCount += 1;
                obj = user;
            }
        });
        this.saveData(users);
        return obj;
    }
    saveNewUser(newUser) {
        let users = this.readData();
        console.log(users);

        if (!Array.isArray(users)) {
            users = [];
        }
        users.push(newUser);
        this.saveData(users);
}
}

export default User;