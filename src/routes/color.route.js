const express = require('express');
const { getAllColors } = require('../controllers/color.controller');

const router = express.Router();

router.route('/').get(getAllColors);

module.exports = router;
