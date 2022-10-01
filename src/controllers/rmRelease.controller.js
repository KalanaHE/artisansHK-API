const { asyncHandler } = require('../middleware');
const rmReleaseService = require('../services/rmRelease.service');

const createRmReleaseRecord = asyncHandler(async (req, res) => {
    const { body } = req;
    const data = await rmReleaseService.createRmReleaseRecord(body);
    return res.status(data.statusCode).json(data);
});

module.exports = { createRmReleaseRecord };
