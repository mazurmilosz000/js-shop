const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => {
    console.log('Here')
    res.send('Hi')
})

app.listen(3000) // TODO: move to config