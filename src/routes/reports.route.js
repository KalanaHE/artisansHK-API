const express = require('express');
const { getArtisanWiseReport, getVillageWiseReport } = require('../controllers/reports.controller');

const router = express.Router();

router.route('/artisan-wise').post(getArtisanWiseReport);

router.route('/village-wise').post(getVillageWiseReport);

module.exports = router;
