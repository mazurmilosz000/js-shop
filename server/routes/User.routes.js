import express from 'express';
import * as userController from '../controllers/User.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

const router = express.Router();

router.get('/basket', verifyToken, userController.getUserBasket);
router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);


export default router;