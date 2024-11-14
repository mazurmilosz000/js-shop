require("./db/Mongo.database.js")

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')
const categoryRouter = require('./routes/Category.routes.js')

const app = express()

const PORT = config.PORT;

app.use(express.json());
app.use('/api/category', categoryRouter);

app.listen(PORT, () => {
    console.log('Server starter on port: %d', PORT)
});