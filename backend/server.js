import express from 'express';

const PORT = 4444;
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

console.log("Hello World");