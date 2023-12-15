// import { useState, useEffect } from "react";

// export function useCinemaData() {

//     // state to store cinema data, movies, shows in a single function which is imported to their respective components
//     const [cinemaData, setCinemaData] = useState(null);
//     const [movies, setMovies] = useState([]);
//     const [shows, setShows] = useState([]);
//     // state to track if application is loading
//     const [loading, setLoading] = useState(true);
//     // state to track any error message
//     const [error, setError] = useState(null);

//     // trigger the arrow function inside useEffect ONE time before loading
//     //useEffect is used now only once in the useCinemaData function and imported to other components of the webpage
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000');

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setCinemaData(data);
//                 setMovies(data.cinema.movies);

//                 const allShows = data.cinema.movies.flatMap(movie => movie.shows);
//                 setShows(allShows);

//             } catch (err) {
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);



//     return { cinemaData, movies, shows, loading, error };
// }


import { useState, useEffect } from 'react';

export function useCinemaData() {
    // state to store cinema data, movies, shows in a single function which is imported to their respective components
    const [cinemaData, setCinemaData] = useState('');
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    // state to track if application is loading
    // const [loading, setLoading] = useState(true);
    // state to track any error message
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleRequest = (e) => {
        e.preventDefault();
        const endpoint = "http://localhost:4000/movies";

        const option = {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        }

        asynqRequest(endpoint, option);
    }

    const asynqRequest = (endpoint, option) => {
        fetch(endpoint, option)
            .then(response => response.json())
            .then((data) => {
                console.log("data", data);
                console.log("cinemaData", cinemaData);
                setCinemaData(data);
                setMovies(data.cinema.movies);

                const allShows = data.cinema.movies.flatMap(movie => movie.shows);
                setShows(allShows);

                setIsLoading(false);
                setError(null);
            })

            .catch((error) => {
                setIsLoading(false);
                setError(error); // Fix: set error state to the caught error
            });

    };

    useEffect(() => {
        console.log("cinemaData:", cinemaData, "movies:", movies, "shows:", shows);
    }, [cinemaData, movies, shows]);

    return (

        <>
            <h3>API request</h3>

            <button onClick={handleRequest} type="button">
                Make Movie request
            </button>

          
            {cinemaData && <p>Cinema Data: {cinemaData}</p>}
            {movies.length > 0 && <p> Movies: {JSON.stringify(movies)}</p>}
            {shows.length > 0 && <p>Shows: {JSON.stringify(shows)}</p>}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error} </p>}

            {/* <form action="/api/resource" method="get" onSubmit={handleRequest}> */}

            {/* </form> */}
            {/* {[cinemaData, movies, shows, error, isLoading]}; */}
        </>
    )
}

