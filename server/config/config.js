import dotenv from 'dotenv'

dotenv.config()

const config = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET
};

export default config;