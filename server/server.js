// connections
import "./db/Mongo.database.js";

// packages
import express from 'express';
import mongoose from 'mongoose';

import config from './config/config.js';

// routers
import categoryRouter from './routes/Category.routes.js';
import authRouter from './routes/Auth.routes.js';
import userRouter from './routes/User.routes.js';

const app = express();

const PORT = config.PORT;

app.use(express.json());
app.use('/api/category', categoryRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log('Server starter on port: %d', PORT);
});