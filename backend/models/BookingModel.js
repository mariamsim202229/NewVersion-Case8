import fs from 'fs';
import path from 'path';

const bookingDb = path.normalize(path.resolve('./data/bookings.json'));
// import {getDatabase, setDatabase} from '../utils/utils.js';

class Booking {

    constructor() {}

    readData() {
        try {
            const data = fs.readFileSync(bookingDb, { encoding: 'utf-8' });
            console.log('Loaded booking data:', data);
            return JSON.parse(data) || [];
        } catch (error) {
            console.error('Error reading data:', error.message);
            return [];
        }
    }

    saveData(data) {
        return fs.writeFileSync(bookingDb, JSON.stringify(data));
    }
    showAll() {
        const allBookings = this.readData();
        return allBookings;
    }

    showBookingsByUserId(userId) {
        const allBookings = this.readData();
        const foundBooking = allBookings.find(booking => booking.userId === userId);
        return foundBooking;
    }

    saveBooking(newBooking) {
        let allBookings = this.readData();
        console.log(allBookings);

        if (!Array.isArray(allBookings)) {
            allBookings = [];
        }
        allBookings.push(newBooking);
        this.saveData(allBookings);
    }
}
export default Booking;