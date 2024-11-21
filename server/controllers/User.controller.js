import { User } from '../models/User.model.js';
import { handleErrorResponse, checkValidityOfIdParameter } from '../utils/errorHandler.js';
import Basket from '../models/Basket.model.js';

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

        checkValidityOfIdParameter(id, res);

        const user = await User.findById;
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while retriving the user', error);
    }
};

export const getUserBasket = async (req, res) => {
    try {
        const userId = req.user.userId;

        var basket = await Basket.findOne({ user: userId }).populate('items.product');
        if  (!basket) {
            basket = new Basket({ user: userId, items: []});
            await basket.save();
        }

        res.status(200).json(basket);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while trying to get user basket', error);
    }
};


