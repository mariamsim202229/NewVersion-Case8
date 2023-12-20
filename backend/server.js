import express from 'express';
import cors from 'cors';

import userRouter from './routes/UserRoutes.js';
import movieRouter from './routes/MovieRoutes.js';
import bookingRouter from './routes/BookingRoutes.js';

const PORT = 4000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// app.get('/', (req, res) => {
//     res.send("MARIAM");
// });
app.get('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: 'MARIAM'}));
});


app.use(movieRouter);
app.use(userRouter);
app.use(bookingRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});