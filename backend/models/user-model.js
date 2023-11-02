import fs from 'fs';
import path from 'path';

const db = path.normalize(path.resolve('./data/db.json'));

class User {

    constructor() {
    }
    
    readData() {
        const data = fs.readFileSync(db, {encoding: 'utf-8'}); 
        if (!data) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }

    saveData(data) {
        return fs.writeFileSync(db, JSON.stringify(data));
    }

    getAll() {
        const users = this.readData();
        if (!users) {
            return [];
        }
        return users.map(user => ({name:user.name, id: user.id, loginCount: user.loginCount}));
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
}

export default User;