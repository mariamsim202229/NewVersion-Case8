import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCinemaData } from './useCinemaData';

//create a function for displaying the movies and for having a search function inside 
//filtering the movies during the search by the user input based on title
export default function MovieList({ filteredMovies }) {


    const { movies, loading, error } = useCinemaData();
    console.log ('Movies', movies);

    const [searchString, setSearchString] = useState('');
    if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return (
        <div>
        <p>Error loading movies. Please try again later</p>
        </div>
        );
    }

    filteredMovies = movies.filter(movie => movie.title.toLocaleLowerCase().includes(searchString));
    console.log('movies', filteredMovies);
    return (
        //input type text for finding and filtering the movies that the user searches for
        // a div for displaying all the movies and their detailed information by mapping the array of movies from the cinema.json file
        <div>
            <div>
                <input
                    id='inputSearch'
                    placeholder="Sök"
                    type="text"
                    name="search"
                    onInput={e => setSearchString(e.target.value)}
                    value={searchString} />
            </div>
            <br />
            <h1>Veckans top 5 filmer</h1>

            <div className='flexMovie'>
                { filteredMovies ? (
                  filteredMovies.map((movie) => { 
                    console.log('Rendering movie:', movie);
                    return ( 
                    <div className='movieCard'
                        key={movie.movieId} >
                        <Link to='/booking'>
                            {movie.title}
                        </Link>
                        <br />
                        <small>{movie.duration}</small>
                        <br />
                        <b><img src={movie.image} alt="Movie Image" /></b>
                        <br />
                        <i>{movie.description}</i>
                        </div>
                        );
                         })
            ) : (
                <p>no movies found</p>
            )}
        </div>
        </div>
        );
        } 
        