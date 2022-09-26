const { asyncHandler } = require('../middleware');
const artisanService = require('../services/artisan.service');

const searchArtisanByEmpId = asyncHandler(async (req, res) => {
    const {
        params: { empId },
    } = req;
    const data = await artisanService.searchArtisanByEmpId(empId);
    return res.status(data.statusCode).json(data);
});

module.exports = { searchArtisanByEmpId };
