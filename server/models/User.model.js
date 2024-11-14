const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', userData);