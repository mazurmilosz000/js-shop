const mongoose = require('mongoose')

const productData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // reference to the category model
        required: true
    }
});

module.exports = mongoose.model('Product', productData);