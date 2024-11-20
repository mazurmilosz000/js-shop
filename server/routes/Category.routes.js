import express from 'express';
import * as categoryController from '../controllers/Category.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

const router = express.Router();

router.get('/', verifyToken, categoryController.getAllCategories);
router.post('/', verifyToken, categoryController.createCategory);
router.get('/:id', verifyToken, categoryController.getCategoryById);
router.delete('/:id', verifyToken, categoryController.deleteCategoryById);

export default router;