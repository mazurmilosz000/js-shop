import express from 'express';
import * as userController from '../controllers/User.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

const router = express.Router();

router.get('/', verifyToken, userController.getAllUsers);

export default router;