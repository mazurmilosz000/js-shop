const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.MONGO_URL
};