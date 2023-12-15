import Movies from '../models/MovieModel.js';
const movies = new Movies;

let requestCounter = 0;

function handleShowAll(req, res) {
    console.log("Request for ShowAll, nr", requestCounter++);
res.send(movies.showAll());
}

function handleShowOneById(req, res) {
    const { movieId } = req.params;

    console.log(`Request for ShowOneById, with id ${movieId}, nr`, requestCounter++);

    const foundMovie = movies.showOneById(Number(movieId));

    if (!foundMovie) {
        res.status(404).send("No movie found");
    }
    return res.send(foundMovie);
}


export {handleShowAll, handleShowOneById}