const { asyncHandler } = require('../middleware');
const reportsService = require('../services/reports.service');

const getArtisanWiseRmIssueReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getArtisanWiseRmIssueReport(body);
    return res.status(data.statusCode).json(data);
});

const getVillageWiseRmIssueReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getVillageWiseRmIssueReport(body);
    return res.status(data.statusCode).json(data);
});

const getArtisanWiseCollectionReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getArtisanWiseCollectionReport(body);
    return res.status(data.statusCode).json(data);
});

const getGrnReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getGrnReport(body);
    return res.status(data.statusCode).json(data);
});

const getGrnRejectReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getGrnRejectReport(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { getArtisanWiseRmIssueReport, getVillageWiseRmIssueReport, getArtisanWiseCollectionReport, getGrnReport, getGrnRejectReport };
