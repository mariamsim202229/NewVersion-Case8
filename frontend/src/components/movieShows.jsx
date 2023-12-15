import React from 'react';
import BookingForm from './bookingShow';
import { useCinemaData } from './useCinemaData';

export default function Shows() {
  // state to store movies data
  const { movies } = useCinemaData();

  return (
    //   mapping all the movies, and shows, fetched from json file, and render it in a div
    //filtering and displaying the number of seats which are not booked yet 
    <>
      <h1>BOKA DIN FILM HÄR</h1>
      <p className='paragraph'>Välj mellan 5 filmer och mellan 4 olika föreställningar för varje film</p>
      <div className='bookingShow' >
        {movies.map((movie, i) => (
          <div key={i}>
            <h2 className='titleStyle'>{movie.title}  <br /> {movie.duration}</h2>
            {movie.shows.map((show, j) => (
              <div key={j} className="showDiv">
                <p>{show.date}</p>
                <p>Tid: {show.time}</p>
                <p> {show.room}</p>
                <p>Antal lediga sittplatser: {show.seats.filter(seat => !seat.booked).length}</p>
                <BookingForm show={show}  />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}