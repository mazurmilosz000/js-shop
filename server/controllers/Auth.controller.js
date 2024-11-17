import { User, validateUser, checkIfUserExists } from '../models/User.model.js';
import { handleErrorResponse } from '../utils/errorHandler.js';
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

        // generate JWT token
        const token = jwt.sign({ email: user.email }, config.JWT_SECRET);
        res.status(200).json({ token });
    } catch(error) {
        handleErrorResponse(res, 'An error occurred while login', error);
    }
};