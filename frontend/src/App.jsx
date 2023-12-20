import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import WelcomePage from './pages/welcomePage.jsx';
import BookingPage from './pages/bookingPage.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Navbar from './components/navBar';
// import { TopNavigation } from "./components/TopNavigation";
import { Login } from './pages/Login';
import { Authenticated } from './components/Authenticated';
// import { Api } from './components/Api';

function App() {

    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    // const [booking] = MyBookings();
// const [userId]= booking.userId;


    return (
        <>
            {/* <TopNavigation /> */}
            {/* <Api token={token} /> */}
            < Navbar />
            <Authenticated user={user} />
            <Routes>
                <Route path='/movies' element={<WelcomePage />}></Route>
                <Route path='/booking' element={<BookingPage />}></Route>
                <Route path='/MyBookings' element={<MyBookings token={token}  />}></Route>
                <Route path='/login' element={<Login setUser={setUser} setToken={setToken} />}></Route>
            </Routes>
        </>
    )
}

export default App;