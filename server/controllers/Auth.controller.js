import { User, validateUser, checkIfUserExists } from '../models/User.model.js';
import { handleErrorResponse } from '../utils/errorHandler.js';
import { generateTokens, verifyToken, generateAccessToken } from '../services/jwt.service.js';
import * as ENUM from '../constants/enum.js';
import config from '../config/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { error } = validateUSer(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        // check if the email already exists
        const existingUser = await checkIfUserExists(req.body.email);

        if (existingUser) {
            return res.status(400).json({error: 'Email already exists'});
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        });

        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while registering a new user', error);
    }
};

export const login = async (req, res) => {
    try {
        const user = await checkIfUserExists(req.body.email);

        if (!user) {
            return res.status(400).json({error: 'User does not exists'});
        }

        // compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        // generate access & refresh token
        const tokens = await generateTokens(user);
        res.status(200).json({ tokens });
    } catch(error) {
        handleErrorResponse(res, 'An error occurred while login', error);
    }
};


export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token missing' });
    }

    try {
        const decoded = verifyToken(refreshToken, ENUM.TOKEN_TYPE.REFRESH);
        console.log(decoded);
        const newAccessToken = await generateAccessToken({ id: decoded.id, email: decoded.email });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        handleErrorResponse(res, 'Invalid or expired refresh token', error);
    }
};