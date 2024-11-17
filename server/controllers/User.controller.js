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


