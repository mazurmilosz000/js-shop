import mongoose from 'mongoose';

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
    },

    image: {
        type: String,
        required: false
    }
});

const Product = mongoose.model('Product', productData);
export default Product;