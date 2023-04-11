// Core
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
// Middleware
import { checkAuth } from './middleware/index.js';
// Validation
import { signupValidation, signinValidation } from './validations/index.js';
// Controllers
import { AuthController } from './controllers/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.post('/signup', signupValidation, AuthController.signup);

app.post('/signin', signinValidation, AuthController.signin);

app.listen(process.env.PORT, (error) => {
    if (error) console.log(error);

    console.log(`Server is running on port ${process.env.PORT}...`);
});
