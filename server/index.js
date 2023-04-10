// Core
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.post('/signup', (req, res) => {
    console.log(req.body);

    res.status(200).json({ success: true });
});

app.listen('4000', (error) => {
    if (error) console.log(error);

    console.log('Server is running on port 4000...');
});
