import { Router } from 'express';
import { handleShowAll, handleShowBookingsByUserId, handleSaveBooking } from '../controllers/BookingController.js';


const bookingRouter = Router();
// Define routes regarding Poems
bookingRouter.get("/bookings", handleShowAll);
bookingRouter.post("/MyBookings", handleSaveBooking );
bookingRouter.get("/booking/:userId", handleShowBookingsByUserId);
// bookingRouter.post("/newBooking/:userId", handleSaveBooking );

export default bookingRouter;