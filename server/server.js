require("./db/Mongo.database.js")

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')

const app = express()

const PORT = config.PORT;

app.get('/', (req, res) => {
    console.log('Here')
    res.send('Hi')
})

app.listen(PORT)
console.log('Server starter on port: %d', PORT)