const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/Category.controller')

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);

module.exports = router;