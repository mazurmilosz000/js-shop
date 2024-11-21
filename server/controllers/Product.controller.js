import Product from '../models/Product.model.js';
import { handleErrorResponse, checkValidityOfIdParameter } from '../utils/errorHandler.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this name already exists' });
        }

        const newProduct = new Product({ name, description, price, category, image });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while creating product', error);
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while retrieving categories', error);
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        checkValidityOfIdParameter(id, res);

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while retrieving the product', error);
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;

        checkValidityOfIdParameter(id, res);

        const { name, description, price, category, image } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, image },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({error: 'Product not found '});
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while updating the product', error);
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        checkValidityOfIdParameter(id, res);

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            deletedProduct,
        });
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while deleting the product', error);
    }
};

