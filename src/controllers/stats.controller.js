const { asyncHandler } = require('../middleware');
const statsService = require('../services/stats.service');

const getTodayRmIssueTotal = asyncHandler(async (req, res) => {
    const data = await statsService.getTodayRmIssueTotal();
    return res.status(data.statusCode).json(data);
});

const getThisMonthRmIssueTotal = asyncHandler(async (req, res) => {
    const data = await statsService.getThisMonthRmIssueTotal();
    return res.status(data.statusCode).json(data);
});

module.exports = { getTodayRmIssueTotal, getThisMonthRmIssueTotal };
