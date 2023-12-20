import { useState, useEffect } from "react";
import { Api } from "../components/Api";
import BookingForm from "../components/bookingShow";


export default function MyBookings() {
    const { user, name, email } = BookingForm("");
    // const [user, setUser] = useState({});
    // const [token, setToken] = useState("");
    const [bookings, setBookings] = useState([]);
    // const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({});



    // Callback function to update 'name' and 'email' from BookingForm
    const handleBookingFormChange = (formData) => {
   {     setUser(formData.user);
        setEmail(formData.email);
        setFormData(formData);
    };

    useEffect(() => {

        const fetchBookings = async () => {
            if (formData && formData.user && formData.user.userId) {
                const userId = formData.user.userId;

                if (userId) {
                    const endpoint = `http://localhost:4000/bookings/${userId}`;

                    try {
                        const bookingData = await Api({ token: "", endpoint });
                        setBookings(bookingData);

                        // setToken;
                    }
                    catch (error) {
                        console.log("Error fetching bookings:", error);

                    }
                } else {
                    console.error("formData.user.userId is undefined");
                }
            } else {
                console.error("formData or formData.user is undefined");
            }
        };
        fetchBookings();


    }, [formData]);
}

    return (


        <div>
            <h2>My Bookings</h2>

            <BookingForm onChange={handleBookingFormChange} />
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.bookingId}>

                        User: {booking.userId}, Show: {booking.showId},  {booking.name} {booking.email}
                    </li>
                ))}
            </ul>
        </div>
    )


}