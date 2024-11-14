const Category = require('../models/Category.model')

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
        console.log('%s: %s', errorMsg, error);
        res.status(500).json({error: errorMsg});
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        let errorMsg = 'An error occurred while retrieving categories';
        console.log('%s: %s', errorMsg, error);
        res.status(500).json({error: errorMsg});
    }
}

module.exports = {
    createCategory,
    getAllCategories
};