import express from 'express';
import * as productController from '../controllers/Product.controller.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProductById);

export default router;