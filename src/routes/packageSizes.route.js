const express = require('express');
const { getPackageSizes } = require('../controllers/packageSizes.controller');

const router = express.Router();

router.route('/').get(getPackageSizes);

module.exports = router;
