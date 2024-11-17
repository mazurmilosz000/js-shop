import jwt from 'jsonwebtoken';
import config from '../config/config.js';


export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // remove 'Bearer ' prefix
    const tokenWithoutBearerPrefix = token.split(' ')[1];

    jwt.verify(tokenWithoutBearerPrefix, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};