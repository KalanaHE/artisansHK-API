const express = require('express');
const { getAllQualityInspectors } = require('../controllers/qc.controller');

const router = express.Router();

router.route('/').get(getAllQualityInspectors);

module.exports = router;
