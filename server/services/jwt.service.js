import jwt from "jsonwebtoken";
import config from '../config/config.js';
import * as ENUM from '../constants/enum.js';

export const generateTokens = async (user) => {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return { accessToken, refreshToken };

}

export const generateAccessToken = async (user) => {
    return jwt.sign({ email: user.email }, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRATION });
}

export const generateRefreshToken = async (user) => {
    return jwt.sign({ email: user.email }, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRATION });
}

export const verifyToken = async (token, type) => {
    if (type == ENUM.TOKEN_TYPE.ACCESS) {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    }
    else if (type == ENUM.TOKEN_TYPE.REFRESH) {
        return jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    }

    throw new Error('Wrong token type');
}
