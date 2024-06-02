import { Router } from 'express';
import { handleShowAllBookings, handleCreateBooking } from '../controllers/BookingController.js';
const bookingRouter = Router();
// Define routes regarding Bookings
bookingRouter.get("/bookings", handleShowAllBookings);
bookingRouter.post("/bookings", handleCreateBooking);

export default bookingRouter;