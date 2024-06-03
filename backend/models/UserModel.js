import fs from 'fs';
import path from 'path';

import Bookings from './BookingModel.js';
const bookings = new Bookings();
// import { userSessions } from '../controllers/UserController.js';

const userDb = path.normalize(path.resolve('./data/users.json'));

class User {

    constructor() {
    }

    readData() {
        const data = fs.readFileSync(userDb, { encoding: 'utf-8' });
        if (!data) {
            return [];
        } else {
            return JSON.parse(data);
        }
    }

    saveData(data) {
        return fs.writeFileSync(userDb, JSON.stringify(data));
    }

    authenticate(username, password) {
        const users = this.readData();
        // check if username exists
        const foundUser = users.find(user => user.username === username);

        if (!foundUser) {
            return false;
        }

        const isMatching = foundUser.password === password;

        return isMatching;
    }

    getAllUsers() {
        const allUsers = this.readData();
        // protect the password
        allUsers.forEach(user => delete user.password); 
        return allUsers;
    }

    getUserByUsername(username) {
        const allUsers = this.readData();
    
        const foundUser = allUsers.find(user => user.username === username);
    
        // protect password
        delete foundUser.password;
    
        // Get all bookings associated with user
        const allBookings = bookings.showAllBookings();
        const bookingsByUser = allBookings.filter(bookings => bookings.username === foundUser.username);
    
        foundUser.bookings = bookingsByUser;
    
        return foundUser;
    }

}
export default User;