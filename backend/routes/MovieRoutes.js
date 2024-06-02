import { Router } from 'express';
import { handleShowAll, handleShowOneById } from '../controllers/MovieController.js';

const movieRouter = Router();
// Define routes regarding Movies
movieRouter.get("/movies", handleShowAll);
movieRouter.get("/movies/:movieId", handleShowOneById);

export default movieRouter;
