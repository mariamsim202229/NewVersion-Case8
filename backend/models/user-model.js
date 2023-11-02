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

    getAll() {
        const users = this.readData();
        if (!users) {
            return;
        }
        return users.map(user => ({name:user.name, id: user.id, loginCount: user.loginCount}));
    }
}

export default User;