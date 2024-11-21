import Category from '../models/Category.model.js';
import { handleErrorResponse, checkValidityOfIdParameter } from '../utils/errorHandler.js';

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ name });
        if  (existingCategory) {
            return res.status(400).json({error: 'Category with this name already exists'});
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while creating category', error);
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while retrieving categories', error);
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        checkValidityOfIdParameter(id, res);

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while retrieving the category', error);
    }
};

export const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        checkValidityOfIdParameter(id, res);

        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({
            message: 'Category deleted successfully',
            deletedCategory,
        });
    } catch (error) {
        handleErrorResponse(res, 'An error occurred while deleting the category', error);
    }
};