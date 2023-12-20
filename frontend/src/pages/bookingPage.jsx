import React from 'react';
import Shows from '../components/movieShows';
// import Navbar from '../components/navBar';
import Footer from '../components/footer';
import { useCinemaData } from '../components/useCinemaData';
// import { Api } from '../components/Api';

//create a function for the route bookingpage and include all the components
function BookingPage() {
    const { loading, error } = useCinemaData();
    // const [user, setUser] = useState({});
    // const [token, setToken] = useState("");
    // check if loading, if true then we should display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // check if there is an error, if true then we should display it
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        // a page/route for booking the shows, includes all the components 
        <div className='bookingApp'>
            {/* <Navbar /> */}
            <Shows />
          
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default BookingPage;