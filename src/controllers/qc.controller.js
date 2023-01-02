const { asyncHandler } = require('../middleware');
const qcService = require('../services/qc.service');

const getAllQualityInspectors = asyncHandler(async (req, res) => {
    const data = await qcService.getAllQualityInspectors();
    return res.status(data.statusCode).json(data);
});

const regularizeGrn = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await qcService.regularizeGrn(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { getAllQualityInspectors, regularizeGrn };
