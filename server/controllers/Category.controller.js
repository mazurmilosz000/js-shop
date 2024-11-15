const mongoose = require('mongoose');
const Category = require('../models/Category.model');

const createCategory = async (req, res) => {
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
        let errorMsg = 'An error occurred while creating category';
        console.error('%s: %s', errorMsg, error);
        res.status(500).json({error: errorMsg});
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        let errorMsg = 'An error occurred while retrieving categories';
        console.error('%s: %s', errorMsg, error);
        res.status(500).json({error: errorMsg});
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        let errorMsg = 'An error occurred while retrieving the category';
        console.error('%s: %s', errorMsg, error);
        res.status(500).json({ error: errorMsg });
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid category ID format' }); // TODO: move to private method
        }

        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({
            message: 'Category deleted successfully',
            deletedCategory,
        });
    } catch (error) {
        let errorMsg = 'An error occurred while deleting the category'; // TODO: move to private method
        console.error('%s: %s', errorMsg, error);
        res.status(500).json({ error: errorMsg });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategoryById
};