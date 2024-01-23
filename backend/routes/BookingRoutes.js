import { Router } from 'express';
import { handleShowAll, handleShowBookingsByUserId, handleSaveBooking } from '../controllers/BookingController.js';
const bookingRouter = Router();
// Define routes regarding Poems
bookingRouter.get("/bookings", handleShowAll);
bookingRouter.get("/bookings/:userId", handleShowBookingsByUserId);
bookingRouter.post("/saveBooking", handleSaveBooking);

export default bookingRouter;