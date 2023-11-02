import express from 'express';
// import User from './models/user-model.js';
import userRouter from './routes/user-router.js';

const PORT = 4444;
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});