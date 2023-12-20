import React from 'react';
import Cinema from '../components/cinema';
import MovieList from '../components/movieList';
// import Navbar from '../components/navBar';
import Footer from '../components/footer';
import { useCinemaData } from '../components/useCinemaData';

//creating a function for the route WelcomePage, importing all the components
export default function WelcomePage() {
  const { cinemaData, movies, loading, error } = useCinemaData();

  // check if loading, if true then we should display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // check if there is an error, if true then we should display it
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //the homepage component and its components imported in the page
  return (
    <div className='cinemaApp'>
      {/* <Navbar /> */}
      <Cinema cinemaData={cinemaData} />
      <MovieList filteredMovies={movies} />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}