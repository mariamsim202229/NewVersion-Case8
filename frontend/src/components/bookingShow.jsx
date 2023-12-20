import { useState } from 'react';
import {Api}  from './Api';
// import {Authenticated} from './Authenticated';

//a function called BookingForm for displaying a form for booking a specific show
//using state for different variables like whether the booking is open, when email input field should be opened, or when a confirmation message should be displayed
function BookingForm({ showId, userId }) {

  const [isBookingOpen, setBookingOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [userId] = Api();

  // by clicking on the button book, it set the booking open and removes the previous confirmation message
  const handleButtonClick = () => {
    setBookingOpen(true);
    setConfirmationMessage('');
  };

  //by inserting a valid email the user can successfully book a show
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  //the required email length and pattern must be met othewise an error message will be displayed
  //if the email meet the criteria for booking, then a confirmation message is displayed inside the show information field

  const handleBookShow = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.length < 5 || !emailPattern.test(email)) {
      setEmailError('Ange en giltig e-postadress med minst 5 tecken.')
    } else {

      const bookingData = {
        userId: Number(userId),
        showId: showId,
        name: name,
        email: email,
      };

      Api(bookingData);

      const message = (`Boking bekräftad for namn och mejladress: ${name}, ${email}`);
      setConfirmationMessage(message);
      setBookingOpen(false);
      setEmail('');
    }
  };

  //all the necessary buttons, input field and displayed messages are rendered on the page by return of the function BookingForm
  //the function is then exported to the component movieShows, function Shows. 
  return (
    <div>
      {!isBookingOpen ? (
        <button onClick={handleButtonClick}>BOKA</button>
      ) : (
        <div>
          <input className='littleInput'
            type="email"
            placeholder="skriv din mejladress"
            value={email}
            onChange={handleEmailChange}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
            title='Please enter a valid email adress'
          />
          <input
            className='littleInput'
            type="text"
            placeholder='Skriv ditt namn'
            value={name}
            onChange={handleNameChange}
            required
          />
          {emailError && <div className='error-message'>{emailError}</div>}
          <button onClick={handleBookShow}>BEKRÄFTA</button>
        </div>
      )}
      {confirmationMessage && (
        <div className='confirm'>
          <p>{confirmationMessage}</p>
        </div>
      )}
    </div>
  );
}

export default BookingForm;