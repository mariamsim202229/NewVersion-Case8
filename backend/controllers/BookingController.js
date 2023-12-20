import Bookings from '../models/BookingModel.js';
const bookings = new Bookings;

let requestCounter = 0;

function handleShowAll(req, res) {


    // const allBookings = bookings.showAll();

    // res.json(allBookings || []);
    res.send(bookings.showAll());
    console.log("Request for ShowAll, nr", requestCounter++);
}

function handleShowBookingsByUserId(req, res) {
    const { userId } = req.params;

    console.log(`Request for showBookingsByUserId, with id ${userId}, nr`, requestCounter++);

    const foundBooking = bookings.showBookingsByUserId(Number(userId));

    if (!foundBooking) {
        res.status(404).send("No booking found");

        return;
    }
    res.send(foundBooking);
}

function handleSaveBooking(req, res) {
    const { userId } = req.params;

    console.log(`Request for saveBooking, with id ${userId}, nr`, requestCounter++);

    // Extract other necessary data from the request body
    const {showId, name, email } = req.body;

    // create a new booking object

    const newBooking = {

        userId: Number(userId),
        showId: showId,
        name: name,
        email: email,
    };

    bookings.saveBooking(newBooking);

    // Respond with the saved booking
    res.status(201).json(newBooking);

    // const savedBooking = bookings.saveBooking(Number(userId));

    // if (!savedBooking) {
    //     res.status(404).send("No bookings saved");
    // }
    // return res.send(newBooking);
}


export { handleShowAll, handleShowBookingsByUserId, handleSaveBooking }