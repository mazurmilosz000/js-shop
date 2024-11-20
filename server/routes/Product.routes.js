import express from 'express';
import * as productController from '../controllers/Product.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

const router = express.Router();

router.get('/', verifyToken, productController.getAllProducts);
router.post('/', verifyToken, productController.createProduct);
router.get('/:id', verifyToken, productController.getProductById);
router.delete('/:id', verifyToken, productController.deleteProductById);
router.put('/:id', verifyToken, productController.updateProductById);

export default router;