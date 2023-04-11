// Core
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validationResult } from 'express-validator';
// Validation
import { signupValidation, signinValidation } from './validations/index.js';
// Middleware
import { checkAuth } from './middleware/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.post('/signup', signupValidation, (req, res) => {
    try {
        const validErrors = validationResult(req);

        if (!validErrors.isEmpty()) {
            return res.status(400).json(validErrors.array());
        }

        fs.readFile(`${__dirname}/db/users.json`, 'utf8',  async (error, data) => {
            if (error) return res.status(500).json(error);

            const users = data ? JSON.parse(data) : [];
            const isFindUser = users.find((i) => i.email === req.body.email);

            if (isFindUser) return res.status(400).json({ message: 'Така пошта вже існує' });

            const { password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const updatedUsers = [...users, { ...req.body, id: Date.now(), password: passwordHash }];

            fs.writeFile(`${__dirname}/db/users.json`, JSON.stringify(updatedUsers), 'utf8', (errors) => {
                if (errors) return res.status(500).json(errors);

                res.status(200).json({ message: 'Успішна реєстрація' });
            });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.post('/signin', signinValidation, (req, res) => {
    try {
        const validErrors = validationResult(req);

        if (!validErrors.isEmpty()) {
            return res.status(401).json(validErrors.array());
        }

        fs.readFile(`${__dirname}/db/users.json`, 'utf8', async (error, data) => {
            if (error) return res.status(500).json(error);

            const users = data ? JSON.parse(data) : [];

            const isFindUser = users.find((i) => i.email === req.body.email);
            const isValidPassword = await bcrypt.compare(req.body.password, isFindUser.password);

            if (isFindUser && isValidPassword) {
                const token = jwt.sign({
                    id: isFindUser.id,
                }, process.env.SECRET_KEY, { expiresIn: '1d' });

                const { password, ...userData } = isFindUser;

                res.status(200).json({
                    ...userData,
                    token,
                });
            } else {
                res.status(400).json({ message: 'Не правільний логін чи пароль' });
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.get('/films', checkAuth, (req, res) => {
    try {
        fs.readFile(`${__dirname}/db/films.json`, 'utf8', (error, data) => {
            if (error) return res.status(500).json(error);

            const films = data ? JSON.parse(data) : [];

            res.status(200).json(films);
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.listen(process.env.PORT, (error) => {
    if (error) console.log(error);

    console.log(`Server is running on port ${process.env.PORT}...`);
});
