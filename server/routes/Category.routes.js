import express from 'express';
import * as categoryController from '../controllers/Category.controller.js';

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);

export default router;