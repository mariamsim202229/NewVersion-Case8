import fs from 'fs';
import path from 'path';

const bookingDb = path.normalize(path.resolve('./data/bookings.json'));

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

    showAllBookings() {
        console.log(showAllBookings()); 
        const allBookings = this.readData();
        return allBookings;
    }

    createBooking(newBooking) {

        //h
        if (!newBooking.username || !newBooking.email ) {
            return false;
        }

        // Read in the database
        const allBookings = this.readData();
         console.log(allBookings);
        // Add booking to array
        const bookingToAdd = { username: newBooking.username, email: newBooking.email };
        allBookings.push(bookingToAdd);
    
        // Set array as new database
         this.saveData(allBookings);
    
        return bookingToAdd;
    }
}
export default Booking;