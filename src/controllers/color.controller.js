const { asyncHandler } = require('../middleware');
const colorService = require('../services/color.service');

const getAllColors = asyncHandler(async (req, res) => {
    const data = await colorService.getAllColors();
    return res.status(data.statusCode).json(data);
});

module.exports = { getAllColors };
