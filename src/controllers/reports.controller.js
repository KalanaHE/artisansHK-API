const { asyncHandler } = require('../middleware');
const reportsService = require('../services/reports.service');

const getArtisanWiseReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getArtisanWiseReport(body);
    return res.status(data.statusCode).json(data);
});

const getVillageWiseReport = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await reportsService.getVillageWiseReport(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { getArtisanWiseReport, getVillageWiseReport };
