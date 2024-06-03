import Bookings from '../models/BookingModel.js';
const bookings = new Bookings();

import { userSessions } from './UserController.js';

let requestCounter = 0;

function handleShowAllBookings(req, res) {
    console.log("Request for ShowAll, nr", requestCounter++);
    res.json(bookings.showAllBookings());
}

function handleCreateBooking(req, res) {
    console.log(`Request for create, with newBooking ${JSON.stringify(req.body)}, nr`, requestCounter++);
    if (!Object.values(userSessions).includes(req.query.sessionKey)) {
        return res.status(401).send("Not authorized");
    }

    const newBooking = req.body;

    if (!newBooking.movieId || !newBooking.showId || !newBooking.seatNumber||!newBooking.username || !newBooking.email) {
        return res.status(501).send("Request did not succeed. Check your request body");
    }

    const createdBooking = bookings.createBooking(newBooking);
    return res.send(createdBooking);
}

export { handleShowAllBookings, handleCreateBooking }