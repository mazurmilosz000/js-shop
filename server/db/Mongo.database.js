const mongoose = require('mongoose')
const config = require('../config/config')

mongoose
.connect(config.DB_URI)
.then(() => console.log("Successfully connected to the database"))
.catch((error) => console.log("An error occurred while connecting to the database: %s", error))
