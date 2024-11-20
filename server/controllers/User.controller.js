import { User } from '../models/User.model.js';
import { handleErrorResponse, checkValidityOfIdParameter } from '../utils/errorHandler.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(error) {
        handleErrorResponse(res, 'An error occurred while retrieving users', error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        checkValidityOfIdParameter(id);

        const user = await User.findById;
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while retriving the user', error);
    }
};


