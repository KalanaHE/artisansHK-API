const express = require('express');
const { getAllQualityInspectors, regularizeGrn } = require('../controllers/qc.controller');

const router = express.Router();

router.route('/').get(getAllQualityInspectors);
router.route('/reqularize-grn').post(regularizeGrn);

module.exports = router;
