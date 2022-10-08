const { asyncHandler } = require('../middleware');
const villageService = require('../services/village.service');

const getAllVillages = asyncHandler(async (req, res) => {
    const data = await villageService.getAllVillages();
    return res.status(data.statusCode).json(data);
});

module.exports = { getAllVillages };
