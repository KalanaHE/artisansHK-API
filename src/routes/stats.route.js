const express = require('express');
const { getTodayRmIssueTotal, getThisMonthRmIssueTotal, getThisMonthCollectionStats } = require('../controllers/stats.controller');

const router = express.Router();

router.route('/today-rm-issue-qouta').get(getTodayRmIssueTotal);

router.route('/this-month-rm-issue-qouta').get(getThisMonthRmIssueTotal);

router.route('/this-month-collection-stats').get(getThisMonthCollectionStats);

module.exports = router;
