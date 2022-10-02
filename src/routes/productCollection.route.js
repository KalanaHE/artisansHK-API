const express = require('express');
const { celebrate } = require('celebrate');
const validations = require('../validations');
const { createProductCollectionRecord } = require('../controllers/productCollection.controller');

const router = express.Router();

router.route('/').post([celebrate(validations.productCollection.productCollection)], createProductCollectionRecord);

module.exports = router;
