const express = require('express');
const { getTodayRmIssueTotal, getThisMonthRmIssueTotal } = require('../controllers/stats.controller');

const router = express.Router();

router.route('/today-rm-issue-qouta').get(getTodayRmIssueTotal);

router.route('/this-month-rm-issue-qouta').get(getThisMonthRmIssueTotal);

module.exports = router;
