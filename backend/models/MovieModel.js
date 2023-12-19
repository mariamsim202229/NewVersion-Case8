import fs from 'fs';
import path from 'path';

const movieDb = path.normalize(path.resolve('./data/movies.json'));
// import {getDatabase, setDatabase} from '../utils/utils.js';

class Movie {

    constructor() {}

    readData() {
        try {
            const data = fs.readFileSync(movieDb, { encoding: 'utf-8' });
            console.log('Loaded movie data:', data);
            return JSON.parse(data) || [];
        } catch (error) {
            console.error('Error reading data:', error.message);
            return [];
        }
    }
    showAll() {
        const allMovies = this.readData();
        return allMovies;
    }

    showOneById(movieId) {
        const allMovies = this.readData();
        const foundMovie = allMovies.movies.find(movies => movies.movieId === movieId);
        return foundMovie;
    }
}

export default Movie;

   