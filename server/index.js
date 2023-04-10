// Core
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cors());
app.post('/signup', (req, res) => {
    fs.readFile(`${__dirname}/db/users.json`, 'utf8', (error, data) => {
        if (error) return res.status(500).json({ error: true });

        const users = data ? JSON.parse(data) : [];

        const isFindUser = users.find((i) => i.email === req.body.email);

        if (isFindUser) return res.status(401).json({ error: true });

        const updatedUsers = [...users, { id: Date.now(), ...req.body }];

        fs.writeFile(`${__dirname}/db/users.json`, JSON.stringify(updatedUsers), 'utf8', (err) => {
            if (err) return res.status(500).json({ error: true });

            res.status(200).json({ success: true });
        });
    });
});

app.listen('4000', (error) => {
    if (error) console.log(error);

    console.log('Server is running on port 4000...');
});
