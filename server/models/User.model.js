import mongoose from 'mongoose';
import joi from 'joi';

const userData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        zip: String,
        country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }
});

const User = mongoose.model('User', userData);

// fixme:
const validateUser = (user) => {
    const schema = joi.object({
        name : joi.string().min(3).max(100).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(8).max(100).required()
    })
    return schema.validate(user);
}

const checkIfUserExists = async (email) => {
    return User.findOne({ email });
};

export { User, validateUser, checkIfUserExists };
