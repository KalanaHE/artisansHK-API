const express = require('express');
const { getArtisanWiseReport } = require('../controllers/reports.controller');

const router = express.Router();

router.route('/artisan-wise').post(getArtisanWiseReport);

module.exports = router;
