const express = require('express');
const {
    getArtisanWiseRmIssueReport,
    getVillageWiseRmIssueReport,
    getArtisanWiseCollectionReport,
    getGrnReport,
} = require('../controllers/reports.controller');

const router = express.Router();

router.route('/rm-issue-artisan-wise').post(getArtisanWiseRmIssueReport);

router.route('/rm-issue-village-wise').post(getVillageWiseRmIssueReport);

router.route('/collection-artisan-wise').post(getArtisanWiseCollectionReport);

router.route('/grn').post(getGrnReport);

module.exports = router;
