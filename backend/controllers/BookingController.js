import Bookings from '../models/BookingModel.js';
const bookings = new Bookings();
let requestCounter = 0;

function handleShowAll(req, res) {
    console.log("Request for ShowAll, nr", requestCounter++);
    res.json(bookings.showAll());
}

function handleShowBookingsByUserId(req, res) {
    const { userId } = req.params;
    console.log(`Request for showBookingsByUserId, with id ${userId}, nr`, requestCounter++);
    const foundBooking = bookings.showBookingsByUserId(Number(userId));

    if (!foundBooking) {
        res.status(204).send("No content");
    }
    return res.send(foundBooking);
}

function handleSaveBooking(req, res) {

    // const { userId } = req.params;
    // Extract other necessary data from the request body
    const { movieId, userId, showId, name, email, seatNumber } = req.body;

    console.log(`Request for saveBooking, with id ${userId}, nr`, requestCounter++);

    // Validate the incoming data
    if (!movieId || !showId || !name || !email || !seatNumber) {
        res.status(400).send("Missing required fields");
        return;
    }

    // create a new booking object
    const newBooking = {
        movieId: movieId,
        userId: userId,
        showId: showId,
        name: name,
        email: email,
        seatNumber: seatNumber,
    };

    bookings.saveBooking(newBooking);
    console.log("newBooking", newBooking);
    // Respond with the saved booking
    res.status(201).json(newBooking);
}
export { handleShowAll, handleShowBookingsByUserId, handleSaveBooking }