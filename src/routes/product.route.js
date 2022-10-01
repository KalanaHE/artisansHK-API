const express = require('express');
const { getProducts } = require('../controllers/product.controller');

const router = express.Router();

router.route('/').get(getProducts);

module.exports = router;
